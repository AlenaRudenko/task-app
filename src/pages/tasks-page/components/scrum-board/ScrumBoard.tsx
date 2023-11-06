import { ITask } from "../../../../interfaces/ITask";
import { TaskItem } from "../task-item/TaskItem";
import "./styles.scss";

interface IProps {
  title: string;
  tasks: ITask[];
  handleClick: (id: string) => void;
  board: number;
  dragOverHandler: (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    task: ITask
  ) => void;
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragStartHandler: (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    task: ITask
  ) => void;
  dragEndHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler: (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    task: ITask
  ) => void;
}

export const ScrumBoard = ({
  title,
  tasks,
  handleClick,
  dragOverHandler,
  dragLeaveHandler,
  dragStartHandler,
  dragEndHandler,
  dropHandler,
  board,
}: IProps) => {
  return (
    <div className='scrum__board'>
      <h1>{title}</h1>
      {tasks.map((task) => (
        <TaskItem
          {...{
            dragOverHandler,
            dropHandler,
            dragEndHandler,
            dragStartHandler,
            dragLeaveHandler,
            board,
            task,
          }}
          draggable={true}
          key={task.id}
          handleClick={() => handleClick(task.id)}
        />
      ))}
    </div>
  );
};
