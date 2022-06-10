import { ISprint } from '../../../redux/sprints/sprints-slice';
import SprintListItem from '../SprintListItem/SprintListItem';
import { SprintListStyled } from './SprintListStyled';

interface IProps {
  sprints: ISprint[];
}

const SprintList = ({ sprints }: IProps) => {
  return (
    <>
      <SprintListStyled>
        {sprints.length === 0 ? (
          <p className="listWrapper">Створіть ваш перший спринт</p>
        ) : (
          <ul className="listWrapper">
            {sprints &&
              sprints.map((sprint) => (
                <li key={sprint.id ?? sprint._id} className="listItem">
                  <SprintListItem sprint={sprint} />
                </li>
              ))}
          </ul>
        )}
      </SprintListStyled>
    </>
  );
};

export default SprintList;
