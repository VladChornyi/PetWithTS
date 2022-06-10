import Modal from '../../common/modal/Modal';
import MembersForm from './MembersForm';

interface IProps {
  closeModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

const CreateMembers = ({ closeModal, setOpenModal }: IProps) => {
  return (
    <Modal nameForm="Додати людей" closeModal={closeModal} setCloseModal={setOpenModal}>
      <MembersForm />
    </Modal>
  );
};

export default CreateMembers;
