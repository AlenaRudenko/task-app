import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { EPriority } from "../../interfaces/priority";
import { getPrioritytext } from "../../utils/priority-text";
import { EStatus } from "../../interfaces/status";
import { getStatusText } from "../../utils/status-text";
import { AppButton } from "../app-button/AppButton";

interface IProps {
  handleNewTask?: () => void;
}

export const Header = ({ handleNewTask }: IProps) => {
  const dispatch = useDispatch<Dispatch>();

  const handleChange = (e: any) => {
    dispatch.view.setView(e.target.value);
  };

  const handleSortChange = (e: any) => {
    dispatch.tasks.sortBy(e.target.value);
  };

  const handleFilterPriorityChange = (e: any) => {
    dispatch.tasks.filterByPriority(+e.target.value);
  };

  const handleFilterStatusChange = (e: any) => {
    dispatch.tasks.filterByStatus(+e.target.value);
  };
  console.log("header render");
  const view = useSelector((state: RootState) => state.view);
  const sort = useSelector((state: RootState) => state.tasks.sort);
  const user = useSelector((state: RootState) => state.user);
  const filterPriority = useSelector(
    (state: RootState) => state.tasks.filterPriority
  );
  const filterStatus = useSelector(
    (state: RootState) => state.tasks.filterStatus
  );
  return (
    <div className='header'>
      <div className='header__title'>
        <h1>Task Checker</h1>
      </div>
      {user && (
        <div className='header__selectContainer'>
          <div key={"tasks-sort"} className='header__selects'>
            <div className='title'>
              <span>Сортировка</span>
            </div>

            <select
              value={sort}
              id='tasks-sort'
              onChange={(e) => handleSortChange(e)}
            >
              <option value={"titleUp"}>По алфавиту Ая</option>
              <option value={"titleDown"}>По алфавиту Яа</option>
              <option value={"statusUp"}>По Статусу ⇧</option>
              <option value={"statusDown"}>По Статусу ⇩</option>
              <option value={"priorityUp"}>По Приоритету ⇧</option>
              <option value={"priorityDown"}>По Приоритету ⇩</option>
            </select>
          </div>
          <div key={"tasks-filterPriority"} className='header__selects'>
            <div className='title'>
              <span>Фильтровать по приоритету</span>
            </div>

            <select
              value={filterPriority}
              id='tasks-filterPriority'
              onChange={(e) => handleFilterPriorityChange(e)}
            >
              <option value={0}>Не выбрано</option>
              {[EPriority.High, EPriority.Low, EPriority.Medium].map((item) => (
                <option value={item}>{getPrioritytext(item)}</option>
              ))}
            </select>
          </div>
          <div key={"filterStatus"} className='header__selects'>
            <div className='title'>
              <span>Фильтровать по статусу</span>
            </div>
            <select
              value={filterStatus}
              id='tasks-filterStatus'
              onChange={(e) => handleFilterStatusChange(e)}
            >
              <option value={0}>Не выбрано</option>
              {[EStatus.Plan, EStatus.Progress, EStatus.Done].map((item) => (
                <option value={item}>{getStatusText(item)}</option>
              ))}
            </select>
          </div>
          <div className='header__selects'>
            <div className='title'>
              <span>Вид</span>
            </div>
            <select value={view} id='tasks' onChange={(e) => handleChange(e)}>
              <option value={"short"}>Краткий вид</option>
              <option value={"full"}>Полный вид</option>
              <option value={"scrumStatus"}>Scrum доска</option>
            </select>
          </div>
          {handleNewTask && (
            <div className='header__add'>
              <AppButton text='Добавить задачу' onHandleClick={handleNewTask} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
