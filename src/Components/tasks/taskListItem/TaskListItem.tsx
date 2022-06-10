import Button from '../../common/button/Button';
import { TaskListItemWrapper } from './TaskListItemStyled';
import {
  deleteSprintsTask,
  IItem,
  IItem_,
  patchTaskHours,
} from '../../../redux/task/task-operations';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

// import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../../redux/store';

const schema = yup.object().shape({
  hoursWasted: yup
    .number()
    .min(0, 'Должно быть от нуля до 8')
    .max(8, 'Должно быть от нуля до 8')
    .required('Должно быть обязательно')
    .positive()
    .integer(),
});

interface IFormikObjPart {
  hoursWasted: number | string;
}

interface IFormikObj {
  initialValues: IFormikObjPart;
  validationSchema: any;
  onSubmit: any;
}

interface IProps {
  task: IItem | IItem_;
  targetDate: string;
}

const TaskListItem = ({ task, targetDate }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDesktop, setIsOpenDesktop] = useState<boolean>(false);
  const [hoursWasted, sethoursWasted] = useState<number>(0);
  const [sprintId, setSprintId] = useState<string>('');
  const [currentDayHour, setcurrentDayHour] = useState(0);
  const FormikObjState: IFormikObj = {
    initialValues: { hoursWasted: 0 },
    validationSchema: schema,
    onSubmit: null,
  };
  const formik = useFormik(FormikObjState);
  const dispatch: AppDispatch = useDispatch();

  const deleteTask = () => {
    return dispatch(deleteSprintsTask(task._id ?? task.id));
  };

  const onHandleClikc = () => {
    setSprintId(task._id ?? task.id);
    setIsOpen(true);
    focusInput();
  };

  const focusInput = () => {
    return document.getElementById('inputNumber')?.focus();
  };

  useEffect(() => {
    if (formik.values.hoursWasted >= 0) {
      formik.values.hoursWasted = hoursWasted;
    } else {
      formik.values.hoursWasted = 0;
    }
    // formik.values.hoursWasted = currentDayHour;
  }, [hoursWasted, currentDayHour, formik.values]);

  useEffect(() => {
    if (task) {
      task.hoursWastedPerDay.filter((item) => {
        if (item.currentDay === targetDate) {
          setcurrentDayHour(item.singleHoursWasted);
          sethoursWasted(item.singleHoursWasted);
        }
      });
    }
  }, [task, targetDate]);

  const onBlur = () => {
    if (
      Number(formik.values.hoursWasted) >= 0 &&
      Number(formik.values.hoursWasted) <= 8 &&
      formik.values.hoursWasted !== 0
    ) {
      const taskObj = {
        date: targetDate,
        hours: Number(formik.values.hoursWasted),
      };
      if (sprintId) {
        dispatch(patchTaskHours({ sprintId, taskObj }));
      }
    }

    setIsOpen(false);
  };

  const onHandleClickDesktop = async () => {
    setSprintId(task._id ?? task.id);
    setIsOpenDesktop(true);
    focusInputDesktop();
  };

  const focusInputDesktop = () => {
    return document.getElementById('inputNumberDesktop')?.focus();
  };

  const onBlurDesktop = () => {
    if (
      Number(formik.values.hoursWasted) >= 0 &&
      Number(formik.values.hoursWasted) <= 8 &&
      formik.values.hoursWasted !== ''
    ) {
      const taskObj = {
        date: targetDate,
        hours: Number(formik.values.hoursWasted),
      };
      dispatch(patchTaskHours({ sprintId, taskObj }));
    }
    setIsOpenDesktop(false);
  };

  useEffect(() => {
    if (formik.errors.hoursWasted) {
      if (formik.errors.hoursWasted === 'hoursWasted must be a positive number') {
        if (formik.values.hoursWasted !== 0) {
          toast.warning('Мінімальний час на виконання однієї задачі - 0 год на день.');
        }
      }

      if (formik.errors.hoursWasted === 'Должно быть от нуля до 8') {
        toast.warning(
          'Максимальний час на виконання однієї задачі - 8 год на день. Не перепрацьовуйте!',
        );
      }
    }
  }, [formik.errors.hoursWasted, formik.values.hoursWasted]);

  return (
    <TaskListItemWrapper>
      <div className="TitleWrapper">
        <h3 className="TaskTitle">{task.title}</h3>
        <div className="TaskTitleAfter"></div>
      </div>
      <div className="TaskDescriptionTablet">
        <p className="describtion">
          <span className="describtionHour">Заплановано годин</span>
          <span className="describtionHourNumber">{task.hoursPlanned}</span>
        </p>
        <p className="describtion">
          <span className="describtionHour">Витрачено год / день</span>
          {!isOpen && (
            <span className="describtionNumber" onClick={onHandleClikc}>
              {currentDayHour}
            </span>
          )}

          {isOpen && (
            <input
              id="inputNumber"
              name="hoursWasted"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.hoursWasted}
              className="inputNumber"
              onBlur={onBlur}
              // min="0"
              // max="8"
            />
          )}
        </p>
        <p className="describtion describtionLastChild">
          <span className="describtionHour">Витрачено годин</span>
          <span className="describtionHourNumber">{task.hoursWasted}</span>
        </p>
        <div className="BtnDelete">
          <Button icon="delete" classBtn="editDelete" onHandleClick={deleteTask} />
        </div>
      </div>
      <div className="TaskDescriptionDesktop">
        <span className="describtionHourNumber">{task.hoursPlanned}</span>
        {!isOpenDesktop && (
          <span className="describtionNumber" onClick={onHandleClickDesktop}>
            {currentDayHour}
          </span>
        )}
        {isOpenDesktop && (
          <input
            id="inputNumberDesktop"
            name="hoursWasted"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.hoursWasted}
            className="inputNumberDesktop"
            onBlur={onBlurDesktop}
            // min="0"
          />
        )}
        <span className="describtionHourNumber">{task.hoursWasted}</span>

        <div className="BtnDeleteDesktop">
          <Button icon="delete" classBtn="editDelete" onHandleClick={deleteTask} />
        </div>
      </div>
    </TaskListItemWrapper>
  );
};

export default TaskListItem;
