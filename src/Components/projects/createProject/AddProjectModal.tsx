import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import SubmitButton from '../../common/submitButton/SubmitButton';
import { WrapperForm } from './AddProjectModalStyled';
import projectsOperations from '../../../redux/projects/projects-operations';

interface IProps {
  setCloseModal: (closeModal: boolean) => void;
}

const AddProjectModal = ({ setCloseModal }: IProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleChangeTitle = (e: ChangeEvent) => {
    setTitle((e.currentTarget as HTMLInputElement).value);
  };

  const handleDescription = (e: ChangeEvent) => {
    setDescription((e.currentTarget as HTMLInputElement).value);
  };

  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(projectsOperations.postProject({ title, description }));
    setTitle('');
    setDescription('');
    setCloseModal(true);
  };

  return (
    <WrapperForm>
      <form className="form" onSubmit={onHandleSubmit}>
        <label>
          <input
            className="input"
            type="text"
            name="title"
            value={title}
            placeholder="Назва проекту"
            required
            onChange={handleChangeTitle}
          />
        </label>

        <label>
          <h3 className="inputTitle">Опис</h3>
          <input
            type="text"
            className="input"
            name="description"
            value={description}
            required
            onChange={handleDescription}
          />
        </label>
        <div className="submitWrapper">
          <SubmitButton nameBtn="Готово" />
        </div>
      </form>
    </WrapperForm>
  );
};

export default AddProjectModal;
