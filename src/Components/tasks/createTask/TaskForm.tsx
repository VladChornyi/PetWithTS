import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../redux/task/task-operations';

import SubmitButton from '../../common/submitButton/SubmitButton';
import { WrapperForm } from './TaskFormStyled';
import { useParams } from 'react-router';

interface IProps {
  setCloseModal: (closeModal: boolean) => void;
}

const TaskForm = ({ setCloseModal }: IProps) => {
  const [title, setTitle] = useState('');
  const [hoursPlanned, setHoursPlanned] = useState('');
  const { id } = useParams<{ id: string }>();

  const handleChangeTitle = (e: ChangeEvent) => {
    setTitle((e.currentTarget as HTMLInputElement).value);
  };

  const handleHoursPlanned = (e: ChangeEvent) => {
    setHoursPlanned((e.currentTarget as HTMLInputElement).value);
  };

  const dispatch = useDispatch();

  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addTask({ sprintId: id, task: { title, hoursPlanned } }));
    setTitle('');
    setHoursPlanned('');
    setCloseModal(false);
  };

  return (
    <WrapperForm>
      <form onSubmit={onHandleSubmit}>
        <label>
          <input
            className="input"
            type="text"
            name="title"
            value={title}
            placeholder="Назва задачі"
            required
            onChange={handleChangeTitle}
          />
        </label>

        <label>
          <input
            className="input"
            type="number"
            name="hoursPlanned"
            value={hoursPlanned}
            placeholder="Заплановано годин"
            required
            onChange={handleHoursPlanned}
          />
        </label>
        <div className="submitWrapper">
          <SubmitButton nameBtn="Готово" />
        </div>
      </form>
    </WrapperForm>
  );
};

export default TaskForm;
