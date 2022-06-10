import { ChartStyled } from './ChartStyled';
import Button from '../common/button/Button';
import buttonIcons from '../../configs/buttonIcons.json';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import taskSelectors from '../../redux/task/task-selectors';
import sprintSelectors from '../../redux/sprints/sprints-selectors';
import { useParams } from 'react-router';
import { ChangeEventHandler, useEffect, useState } from 'react';
import moment from 'moment';

interface IProps {
  title?: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  draw: boolean;
}

const Chart = ({ title = 'title', open, setOpen, draw = true }: IProps) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [planedHours, setPlanedHours] = useState<number[]>([]);
  const [realHours, setRealHours] = useState<number[]>([]);

  const sprints = useSelector(sprintSelectors.getSprints);
  const tasks = useSelector(taskSelectors.getTasks);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (draw) {
      if (sprints.length !== 0) {
        const currentSprint = sprints.find((sprint) => {
          const sprintId = sprint._id ?? sprint.id;
          return sprintId === id;
        });
        const labelsArr = ['0'];
        const operationAmount = currentSprint?.duration ?? 0;
        for (let i = 0; i < operationAmount; i++) {
          const newLabelArrItem = moment(currentSprint?.startDate)
            .add(i, 'day')
            .format('YYYY-MM-DD');
          labelsArr.push(newLabelArrItem);
        }
        setLabels(labelsArr);
      }
    }
  }, [id, sprints, draw]);

  useEffect(() => {
    if (tasks.length !== 0) {
      // Planned arr hours
      let tasksTotalTime = 0;
      tasks.forEach((task) => (tasksTotalTime += Number(task.hoursPlanned)));
      const tasksTotalTimeArr = [Number(tasksTotalTime)];
      const dayAmount = tasks[0].hoursWastedPerDay.length;
      const substractor = tasksTotalTime / dayAmount;
      let newSubstractor = substractor;
      for (let i = 0; i < dayAmount - 1; i++) {
        tasksTotalTimeArr.push(tasksTotalTime - newSubstractor);
        newSubstractor += substractor;
      }
      tasksTotalTimeArr.push(0);
      setPlanedHours(tasksTotalTimeArr);
      // Used arr hours
      const realHourArr = [tasksTotalTime];
      for (let i = 0; i < dayAmount; i++) {
        let realHourItem = 0;
        for (let j = 0; j < tasks.length; j++) {
          realHourItem += tasks[j].hoursWastedPerDay[i].singleHoursWasted;
        }
        realHourArr.push(realHourArr[realHourArr.length - 1] - realHourItem);
      }
      setRealHours(realHourArr);
    }
  }, [tasks]);

  const handleEscape = (e: KeyboardEvent) => e.code === 'Escape' && setOpen(false);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    const body = document.querySelector('body');
    if (open && body) body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      const body = document.querySelector('body');
      if (body) body.style.overflow = 'auto';
    };
  });

  const onOverlayClick: ChangeEventHandler<HTMLInputElement> = ({ target, currentTarget }) => {
    target === currentTarget && setOpen(false);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: realHours,
      },
      {
        label: 'My Second dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(150, 0, 0)',
        borderColor: 'red',
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: 'red',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: planedHours,
      },
    ],
  };
  return (
    <>
      {open && (
        <ChartStyled onClick={onOverlayClick}>
          <div className="modal">
            <h3>{title}</h3>
            <div className="buttonWrapper">
              <Button
                classBtn="close"
                icon={buttonIcons.close}
                onHandleClick={() => setOpen(false)}
              />
            </div>
            <Line data={data} />
          </div>
        </ChartStyled>
      )}
    </>
  );
};

export default Chart;
