import { useDispatch, useSelector } from "react-redux";
import { AppIcon } from "../../../../components/app-icon/AppIcon";
import { InputComponent } from "./input-component/InputComponent";
import "./styles.scss";
import { Dispatch, RootState } from "../../../../store/store";
import { TEvent } from "../../../../interfaces/TEvent";
import { getStatusText } from "../../../../utils/status-text";
import { EStatus } from "../../../../interfaces/status";
import { getPrioritytext } from "../../../../utils/priority-text";
import { EPriority } from "../../../../interfaces/priority";
import { ModalField } from "../task-modal/components/ModalField";
import { AppButton } from "../../../../components/app-button/AppButton";

interface IProps {
  handleNewTask: () => void;
}

export const NewTaskModal = ({ handleNewTask }: IProps) => {
  const dispatch = useDispatch<Dispatch>();
  const task = useSelector((state: RootState) => state.tasks.newTask);

  const handleTitleInput = (e: TEvent) => {
    dispatch.tasks.setNewTask({ title: e.target.value });
  };
  const handleDescriptionInput = (e: TEvent) => {
    dispatch.tasks.setNewTask({ description: e.target.value });
  };
  const handlePriorityInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch.tasks.setNewTask({ priority: +e.target.value });
  };
  const handleStatusInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch.tasks.setNewTask({ status: +e.target.value });
  };
  const handlePlanDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch.tasks.setNewTask({ planDuration: +e.target.value });
  };
  const handleActualDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch.tasks.setNewTask({ actualDuration: +e.target.value });
  };
  const handleStartsAt = (e: TEvent) => {
    dispatch.tasks.setNewTask({ startsAt: e.target.value });
  };

  const setTask = () => {
    dispatch.tasks.setTask();
  };
  return (
    <div className='taskModal__container'>
      <div className='taskModal__content'>
        <div className='taskModal__closeButton' onClick={handleNewTask}>
          <AppIcon icon={"X"} />
        </div>
        <InputComponent
          title={"Задание"}
          type={"text"}
          onHandleChange={handleTitleInput}
          value={task.title}
        />
        <InputComponent
          title={"Описание"}
          type={"text"}
          onHandleChange={handleDescriptionInput}
          value={task.description}
        />
        <ModalField description='Приоритет'>
          <div className='select'>
            <select
              value={getStatusText(task.status)}
              id='tasks-change'
              onChange={(e) => handleStatusInput(e)}
            >
              <option value={0}>{getStatusText(task.status)}</option>
              {[EStatus.Plan, EStatus.Progress, EStatus.Done]
                .filter((item) => item !== task.status)
                .map((item) => (
                  <option key={item} value={item}>
                    {getStatusText(item)}
                  </option>
                ))}
            </select>
          </div>
        </ModalField>

        <ModalField description='Приоритет'>
          <div className='select'>
            <select
              value={getPrioritytext(task.priority)}
              id='tasks-changed'
              onChange={(e) => handlePriorityInput(e)}
            >
              <option value={0}>{getPrioritytext(task.priority)}</option>
              {[EPriority.Low, EPriority.Medium, EPriority.High]
                .filter((item) => item !== task.priority)
                .map((item) => (
                  <option key={item} value={item}>
                    {getPrioritytext(item)}
                  </option>
                ))}
            </select>
          </div>
        </ModalField>

        <ModalField description='Планируемое время на выполение'>
          <div className='select'>
            <select
              value={task.planDuration}
              id='tasks-change'
              onChange={(e) => handlePlanDuration(e)}
            >
              {Array.from(Array(10).keys()).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </ModalField>
        <ModalField description='Фактическое время выполнения'>
          <div className='select'>
            <select
              value={task.actualDuration}
              id='tasks-change'
              onChange={(e) => handleActualDuration(e)}
            >
              {Array.from(Array(10).keys()).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </ModalField>
        <InputComponent
          title={"Дата начала"}
          type={"date"}
          onHandleChange={handleStartsAt}
          value={task.startsAt}
        />
        <AppButton
          text='Добавить'
          isDisabled={!task.title || !task.startsAt}
          onHandleClick={() => {
            setTask();
            handleNewTask();
          }}
        />
      </div>
    </div>
  );
};
