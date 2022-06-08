import Modal from '../../common/modal/Modal';
import AddProjectModal from './AddProjectModal';

interface IProps {
  closeModal: boolean;
  setCloseModal: (closeModal: boolean) => void;
}

const CreateProject = ({ closeModal, setCloseModal }: IProps) => {
  return (
    <Modal nameForm="Створення проекту" closeModal={closeModal} setCloseModal={setCloseModal}>
      <AddProjectModal setCloseModal={setCloseModal} />
    </Modal>
  );
};

export default CreateProject;
