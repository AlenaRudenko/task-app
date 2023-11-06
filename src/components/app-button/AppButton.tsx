import "./styles.scss";

interface IProps {
  onHandleClick: () => void;
  isDisabled?: boolean;
  text: string;
}

export const AppButton = ({ onHandleClick, isDisabled, text }: IProps) => {
  return (
    <div className='appButton__container'>
      <button
        disabled={isDisabled}
        className={`appButton__button appButton__button${
          isDisabled && "-disabled"
        }`}
        onClick={onHandleClick}
      >
        {text}
      </button>
    </div>
  );
};
