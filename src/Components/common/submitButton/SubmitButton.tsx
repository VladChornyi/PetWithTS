import { ButtonSubmitWrapper } from './SubmitButtonStyled';

interface IProps {
  onHandleSubmit?: () => void;
  nameBtn?: string;
}

const SubmitButton = ({ onHandleSubmit, nameBtn = 'Зареєструватися' }: IProps) => {
  return (
    <ButtonSubmitWrapper>
      <button onSubmit={onHandleSubmit} type="submit" className="btnSubCommon">
        {nameBtn}
      </button>
    </ButtonSubmitWrapper>
  );
};

export default SubmitButton;
