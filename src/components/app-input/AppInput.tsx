import { TEvent } from "../../interfaces/TEvent";
import "./styles.scss";

interface IProps {
  value: string;
  onChangeValue: (e: TEvent) => void;
  placeholder?: string;
  label?: string;
  type: string;
}

export const AppInput = ({
  value,
  onChangeValue,
  placeholder,
  label,
  type,
}: IProps) => {
  return (
    <div className='appInput'>
      {label && <label>{label}</label>}

      <input
        type={type}
        value={value}
        onChange={(e: TEvent) => onChangeValue(e)}
        placeholder={placeholder}
      />
    </div>
  );
};
