import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../../common/submitButton/SubmitButton';
import { WrapperForm } from './MembersFormStyled';
import MembersList from './MembersList';
import { useParams } from 'react-router-dom';
import projectOperations from '../../../redux/projects/projects-operations';
import { RootState } from '../../../redux/store';

const MembersForm = () => {
  const [email, setEmail] = useState('');

  const { id } = useParams<{ id: string }>();

  const handleChange = (e: ChangeEvent) => {
    setEmail((e.currentTarget as HTMLInputElement).value);
  };

  const members = useSelector((state: RootState) => {
    return state.projects.items.filter((project) => {
      const projectId = project._id ?? project.id;
      return projectId === id;
    })[0].members;
  });

  const dispatch = useDispatch();

  const onHandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(projectOperations.addMember({ id, email }));
    setEmail('');
  };

  return (
    <WrapperForm>
      <form onSubmit={onHandleSubmit}>
        <label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            placeholder="Введіть email"
            required
            onChange={handleChange}
          />
        </label>
        <h3 className="inputTitle">Додані користувачі:</h3>
        {members?.length ? (
          <MembersList members={members} />
        ) : (
          <p className="infoText">Ви ще не додали жодного користувача</p>
        )}
        <div className="submitWrapper">
          <SubmitButton nameBtn="Готово" />
        </div>
      </form>
    </WrapperForm>
  );
};

export default MembersForm;
