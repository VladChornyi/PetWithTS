import { ButtonWrapper } from './ButtonStyled';

interface IProps {
  onHandleClick: () => void;
  icon?: string;
  classBtn?: string;
  background?: string;
}

const Button = ({ onHandleClick, icon = 'add', classBtn = 'add', background = '' }: IProps) => {
  return (
    <ButtonWrapper>
      <button type="button" className={`${classBtn} btnCommon`} onClick={onHandleClick}>
        <span className={`material-icons-outlined icon ${background}Icon`}>{icon}</span>
      </button>
    </ButtonWrapper>
  );
};
export default Button;
