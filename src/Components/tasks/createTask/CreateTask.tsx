import Modal from '../../common/modal/Modal';
import TaskForm from './TaskForm';

interface IProps {
  closeModal: boolean;
  setCloseModal: (closeModal: boolean) => void;
}

const CreateTask = ({ closeModal, setCloseModal }: IProps) => {
  return (
    <Modal nameForm="Створення задачі" closeModal={closeModal} setCloseModal={setCloseModal}>
      <TaskForm setCloseModal={setCloseModal} />
    </Modal>
  );
};

export default CreateTask;
