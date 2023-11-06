import { ITask } from "../../../../interfaces/ITask";
import { EPriority } from "../../../../interfaces/priority";
import { EStatus } from "../../../../interfaces/status";
import "./styles.scss";
import { TaskField } from "../task-field/TaskField";

interface IProps {
  task: ITask;
  type?: string;
  handleClick: (id: string) => void;
  draggable?: boolean;
  dragOverHandler?: (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    task: ITask
  ) => void;
  dragLeaveHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragStartHandler?: (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    task: ITask
  ) => void;
  dragEndHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler?: (
    e: React.DragEvent<HTMLDivElement>,
    board: number,
    task: ITask
  ) => void;
  board?: number;
}

export const TaskItem = (props: IProps) => {
  const {
    id,
    title,
    description,
    planDuration,
    actualDuration,
    startsAt,
    priority,
    status,
  } = props.task;

  return (
    <div
      {...(props.draggable
        ? {
            onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
              props.dragOverHandler?.(e, props.board!, props.task);
            },
            draggable: props.draggable,
            onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
              props.dragLeaveHandler?.(e);
            },
            onDragStart: (e: React.DragEvent<HTMLDivElement>) => {
              props.dragStartHandler?.(e, props.board!, props.task);
            },
            onDragEnd: (e: React.DragEvent<HTMLDivElement>) => {
              props.dragEndHandler?.(e);
            },
            onDrop: (e: React.DragEvent<HTMLDivElement>) => {
              props.dropHandler?.(e, props.board!, props.task);
            },
          }
        : {})}
      onClick={() => props.handleClick(id)}
      className={"taskItem__container"}
    >
      <div
        className={`taskItem__content taskItem__content${
          props.type === "short"
            ? "--short"
            : props.type === "full"
            ? "--full"
            : "--scrum"
        }`}
      >
        <TaskField description='Задача' text={title} />
        <TaskField
          description='Приоритет'
          text={
            priority === EPriority.High
              ? "Высокий"
              : priority === EPriority.Medium
              ? "Средний"
              : "Низкий"
          }
        />
        <TaskField
          description='Статус'
          text={
            status === EStatus.Done
              ? "Готово"
              : status === EStatus.Plan
              ? "План"
              : "В процессе"
          }
        />
      </div>
      {props.type === "full" && (
        <div className='taskItem__content--description'>
          <TaskField description='Описание' text={description} />
          <div className='taskItem__content--time'>
            <TaskField
              description='Планируемое время на выполнение'
              text={planDuration}
            />
            <TaskField
              description='Фактическое время выполнения'
              text={actualDuration}
            />
            <TaskField description='Дата начала' text={startsAt} />
          </div>
        </div>
      )}
    </div>
  );
};
