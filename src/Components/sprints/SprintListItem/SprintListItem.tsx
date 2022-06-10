import Button from '../../common/button/Button';
import buttonIcons from '../../../configs/buttonIcons.json';
import { Link } from 'react-router-dom';
import { SprintListItemStyled } from './SprintListItemStyled';
import { useDispatch } from 'react-redux';
import { deleteSprint } from '../../../redux/sprints/sprints-operations';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/uk';
import { ISprint } from '../../../redux/sprints/sprints-slice';

interface IProps {
  sprint: ISprint;
}

const SprintListItem = ({ sprint }: IProps) => {
  moment.locale('uk');
  const startFormatDate = moment(sprint.startDate).format('D MMM');
  const endFormatDate = moment(sprint.endDate).format('D MMM');
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteSprint(sprint.id ?? sprint._id));
  };

  return (
    <SprintListItemStyled>
      <div className="LinkWrapper">
        <Link to={`/project/${id}/sprint/${sprint._id ?? sprint.id}`}>
          <div className="itemWrap">
            <h3>{sprint.title}</h3>

            <ul>
              <li>
                <span className="date">Дата початку</span>
                <span>{startFormatDate}</span>
              </li>
              <li>
                <span className="date">Дата закінчення</span>
                <span>{endFormatDate}</span>
              </li>
              <li>
                <span>Тривалість</span>
                <span>{sprint.duration}</span>
              </li>
            </ul>
          </div>
        </Link>
        <Button icon={buttonIcons.delete} classBtn="delete" onHandleClick={handleClick}></Button>
      </div>
    </SprintListItemStyled>
  );
};

export default SprintListItem;
