import "./styles.scss";
import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  description: string;
  text?: string | number;
  id?: string;
  value?: number;
}

export const ModalField = ({
  description,
  text,
  id,
  value,
  children,
}: IProps) => {
  return (
    <div className='modal__content'>
      <div className='modal__description'>
        <span>{description}</span>
      </div>
      {children ? (
        children
      ) : (
        <div className='modal__text'>
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};
