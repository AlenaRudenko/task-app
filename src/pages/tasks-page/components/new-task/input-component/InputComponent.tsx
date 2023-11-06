import { AppInput } from "../../../../../components/app-input/AppInput";
import { TEvent } from "../../../../../interfaces/TEvent";
import "./styles.scss";

export interface IProps {
  type: string;
  title: string;
  onHandleChange: (e: TEvent) => void;
  value: string;
}
export const InputComponent = ({
  type,
  title,
  onHandleChange,
  value,
}: IProps) => {
  return (
    <div className='input__container'>
      <span>{title}</span>
      <AppInput
        onChangeValue={(e: TEvent) => onHandleChange(e)}
        type={type}
        value={value}
      ></AppInput>
    </div>
  );
};
