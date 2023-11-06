import { useDispatch } from "react-redux";
import { AppIcon } from "../../../../components/app-icon/AppIcon";
import { ITask } from "../../../../interfaces/ITask";
import { getPrioritytext } from "../../../../utils/priority-text";
import { getStatusText } from "../../../../utils/status-text";
import { ModalField } from "./components/ModalField";
import "./styles.scss";
import { Dispatch } from "../../../../store/store";
import { EStatus } from "../../../../interfaces/status";

interface IProps {
  toggleIsOpenTask: () => void;
  task: ITask;
}

export const TaskModal = ({ toggleIsOpenTask, task }: IProps) => {
  const dispatch = useDispatch<Dispatch>();

  const handleStatusChange = (e: any, id: ITask["id"]) => {
    if (!id) return;
    dispatch.tasks.changeTask({ id, status: +e.target.value });
  };

  const handlePlanDurationChange = (e: any, id: ITask["id"]) => {
    if (!id) return;
    dispatch.tasks.changeTask({ id, planDuration: +e.target.value });
  };

  const handleActualDurationChange = (e: any, id: ITask["id"]) => {
    if (!id) return;
    dispatch.tasks.changeTask({ id, actualDuration: +e.target.value });
  };

  return (
    <div className='taskModal__container'>
      <div className='taskModal__content'>
        <div className='taskModal__closeButton' onClick={toggleIsOpenTask}>
          <AppIcon icon={"X"} />
        </div>
        <div className='taskModal__text'>
          <ModalField description='Задание' text={task.title} />
          <ModalField description='Описание' text={task.description} />
          <ModalField
            description='Приоритет'
            text={getPrioritytext(task.priority)}
          />
          <ModalField
            id={task.id}
            description='Статус'
            value={task.status}
            text={getStatusText(task.status)}
          >
            <div className='select'>
              <select
                value={getStatusText(task.status)}
                id='tasks-change'
                onChange={(e) => handleStatusChange(e, task.id)}
              >
                <option value={0}>{getStatusText(task.status)}</option>
                {[EStatus.Plan, EStatus.Progress, EStatus.Done]
                  .filter((item) => item !== task.status)
                  .map((item) => (
                    <option value={item}>{getStatusText(item)}</option>
                  ))}
              </select>
            </div>
          </ModalField>
          <ModalField
            description='Планируемое время на выполение'
            text={task.planDuration}
          >
            <div className='select'>
              <select
                value={task.planDuration}
                id='tasks-change'
                onChange={(e) => handlePlanDurationChange(e, task.id)}
              >
                {Array.from(Array(10).keys())
                  .filter((item) => item !== task.planDuration)
                  .map((item) => (
                    <option value={item}>{item}</option>
                  ))}
              </select>
            </div>
          </ModalField>
          <ModalField
            description='Фактическое время выполнения'
            text={task.actualDuration}
          >
            <div className='select'>
              <select
                value={task.actualDuration}
                id='tasks-change'
                onChange={(e) => handleActualDurationChange(e, task.id)}
              >
                {Array.from(Array(10).keys())
                  .filter((item) => item !== task.actualDuration)
                  .map((item) => (
                    <option value={item}>{item}</option>
                  ))}
              </select>
            </div>
          </ModalField>
          <ModalField description='Дата начала' text={task.startsAt} />
        </div>
      </div>
    </div>
  );
};
