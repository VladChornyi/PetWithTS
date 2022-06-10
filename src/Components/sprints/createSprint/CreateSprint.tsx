import Modal from '../../common/modal/Modal';
import CreateSprintForm from '../createSprintForm/CreateSprintForm';

interface IProps {
  closeModal: boolean;
  setCloseModal: (closeModal: boolean) => void;
}

const CreateSprint = ({ closeModal, setCloseModal }: IProps) => {
  return (
    <Modal nameForm="Створення спринта" closeModal={closeModal} setCloseModal={setCloseModal}>
      <CreateSprintForm setOpenModal={setCloseModal} />
    </Modal>
  );
};

export default CreateSprint;
