import SprintListItem from '../SprintListItem/SprintListItem';
import { SprintListStyled } from './SprintListStyled';

interface ISprint {
  _id: string;
  id: string;
  title: string;
  duration: number;
  startDate: number | string;
  endDate: number | string;
}

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
