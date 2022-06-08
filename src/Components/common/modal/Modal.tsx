import { ChangeEventHandler, useEffect } from 'react';
import { Overlay } from './ModalStyled';

//для работы модалки необходимо передать 3 пропса,
// в первом передаем метод который будет переключать в стейте флаг
// вторым пропсом передаем компонент формы с кнопкой сабмит
// третьим передаем имя формы
//

interface IProps {
  closeModal: boolean;
  setCloseModal: (closeModal: boolean) => void;
  children: JSX.Element | JSX.Element[];
  nameForm: string;
}

const Modal = ({ closeModal, setCloseModal, children, nameForm = 'Name form' }: IProps) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    const body = document.querySelector('body');
    if (closeModal && body) body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      const body = document.querySelector('body');
      if (body) body.style.overflow = 'auto';
    };
  });

  const handleEscape = (e: KeyboardEvent) => e.code === 'Escape' && setCloseModal(!closeModal);

  const onOverlayClick: ChangeEventHandler<HTMLInputElement> = ({ target, currentTarget }) => {
    target === currentTarget && setCloseModal(!closeModal);
  };
  return (
    <>
      {closeModal && (
        <Overlay onClick={onOverlayClick}>
          <div className="modal">
            <button type="button" className="closeBtn" onClick={() => setCloseModal(!closeModal)}>
              <span className="material-icons-outlined">close</span>
            </button>
            <h2 className="nameForm">{nameForm}</h2>
            {children}
            <button type="button" className="cancelBtn" onClick={() => setCloseModal(!closeModal)}>
              Відміна
            </button>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default Modal;
