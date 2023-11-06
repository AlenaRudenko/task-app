import "./styles.scss";

interface IProps {
  text: string | number;
  description: string;
}

export const TaskField = ({ text, description }: IProps) => {
  return (
    <div className='taskField'>
      <div className='description'>
        <span>{`${description}:`}</span>
      </div>
      <div className='text'>
        <span>{text}</span>
      </div>
    </div>
  );
};
