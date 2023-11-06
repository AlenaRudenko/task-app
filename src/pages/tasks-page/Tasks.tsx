import { Header } from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TaskItem } from "./components/task-item/TaskItem";
import "./styles.scss";
import { TaskModal } from "./components/task-modal/TaskModal";
import { EStatus } from "../../interfaces/status";
import { ScrumBoard } from "./components/scrum-board/ScrumBoard";
import { getStatusText } from "../../utils/status-text";
import { ITask } from "../../interfaces/ITask";
import { NewTaskModal } from "./components/new-task/NewTaskModal";
import { EPriority } from "../../interfaces/priority";

interface IState {
  isOpenTask: boolean;
  taskId: string;
  draggadleTask: ITask | null;
  isOpenNewTaskModal: boolean;
}

export const TasksPage = () => {
  const [isOpenTask, toggleIsOpenTask] = useState<IState["isOpenTask"]>(false);
  const [isOpenNewTaskModal, toggleIsOpenTaskModal] =
    useState<IState["isOpenNewTaskModal"]>(false);
  const [taskId, setTaskId] = useState<IState["taskId"]>("");
  const [draggadleTask, setDraggableTask] =
    useState<IState["draggadleTask"]>(null);

  const dispatch = useDispatch<Dispatch>();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const view = useSelector((state: RootState) => state.view);
  const userId = useSelector((state: RootState) => state.user?.id);

  const filterPriority = useSelector(
    (state: RootState) => state.tasks.filterPriority
  );
  const filterStatus = useSelector(
    (state: RootState) => state.tasks.filterStatus
  );

  const handleClick = useCallback(
    (id: string) => {
      toggleIsOpenTask(!isOpenTask);
      setTaskId(id);
    },
    [isOpenTask]
  );
  const handleNewTask = useCallback(() => {
    toggleIsOpenTaskModal(!isOpenNewTaskModal);
    dispatch.tasks.setNewTask({
      priority: EPriority.Low,
      status: EStatus.Plan,
      title: "",
      description: "",
      startsAt: "",
      planDuration: 0,
      actualDuration: 0,
    });
  }, [dispatch.tasks, isOpenNewTaskModal]);

  const handleModalClick = useCallback(() => {
    toggleIsOpenTask(!isOpenTask);
  }, [isOpenTask]);

  const filterTasks = useMemo(() => {
    return tasks.filter(
      (item) =>
        (!filterPriority || item.priority === filterPriority) &&
        (!filterStatus || item.status === filterStatus)
    );
  }, [filterPriority, filterStatus, tasks]);

  const currentTask = useMemo(() => {
    return tasks?.find((task) => task.id === taskId);
  }, [taskId, tasks]);

  useEffect(() => {
    if (userId) {
      dispatch.tasks.tasks(userId);
    }
  }, [dispatch.tasks, userId]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch.tasks.tasks(userId!);
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const dragOverHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    task: ITask
  ) => {
    e.preventDefault();
    const target = e.target as any;
    if (target.className === "taskItem__container") {
      target.style.boxShadow = "0 2px 3px black";
    }
  };

  const dropHandler = useCallback(
    (e: React.DragEvent<HTMLDivElement>, board: number, task: ITask) => {
      e.preventDefault();
      if (!task || !draggadleTask) return;
      dispatch.tasks.changeTask({
        id: draggadleTask.id,
        status: task.status,
      });
    },
    [dispatch.tasks, draggadleTask]
  );

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    task: ITask
  ) => {
    setDraggableTask(task);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as any;
    target.style.boxShadow = "none";
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as any;
    target.style.boxShadow = "none";
  };

  return (
    <div className='tasks__container'>
      <Header handleNewTask={handleNewTask} />
      {isOpenTask && currentTask && (
        <TaskModal toggleIsOpenTask={handleModalClick} task={currentTask} />
      )}
      {isOpenNewTaskModal && <NewTaskModal handleNewTask={handleNewTask} />}
      <div className='task'>
        {(view === "short" || view === "full") &&
          filterTasks.map((task) => (
            <TaskItem
              key={task.id}
              handleClick={handleClick}
              task={task}
              type={view}
            />
          ))}
        {view === "scrumStatus" && (
          <div className='scrum__container'>
            {[EStatus.Plan, EStatus.Progress, EStatus.Done].map(
              (board: number) => (
                <ScrumBoard
                  {...{
                    dragOverHandler,
                    dropHandler,
                    dragEndHandler,
                    dragStartHandler,
                    dragLeaveHandler,
                    board,
                  }}
                  title={getStatusText(board)}
                  tasks={filterTasks
                    .filter((task) => task.status === board)
                    .sort((a, b) => (a.priority > b.priority ? 1 : -1))}
                  handleClick={handleClick}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
