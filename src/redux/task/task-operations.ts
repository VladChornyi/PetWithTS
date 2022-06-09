import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getError } from "../error/error-handler";


interface IAddTaskProps {
  sprintId: string;
  task: object;
}

interface IHoursWastedPerDay {
  currentDay: string;
  singleHoursWasted: number;
}

export interface IItem {
  title: string;
  id: string;
  _id: never;
  hoursPlanned: number;
  hoursWasted: number;
  hoursWastedPerDay: IHoursWastedPerDay[];
}
export interface IItem_ {
  title: string;
  id: never;
  _id: string;
  hoursPlanned: number;
  hoursWasted: number;
  hoursWastedPerDay: IHoursWastedPerDay[];
}

interface IPatchTaskHours {
  sprintId: string;
  taskObj: object;
}

export const addTask = createAsyncThunk(
  "task/addTask",
  async ({ sprintId, task }:IAddTaskProps, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/task/${sprintId}`, task);
      return data;
    } catch (error:any) {
        getError({
          error,
          cb: () => addTask({ sprintId, task }),
          operationType: "sprint/addSprint",
        })
      return rejectWithValue(error.message);
    }
  }
);

export const getSprintsTasks = createAsyncThunk(
  "task/getTAsks",

  async (sprintId:string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/task/${sprintId}`);
      return data;
    } catch (error:any) {
        getError({
          error,
          cb: () => getSprintsTasks(sprintId),
          operationType: "task/getTAsks",
        })
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSprintsTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId:string, { rejectWithValue }) => {
    try {
      await axios.delete(`/task/${taskId}`);
      return taskId;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

export const patchTaskHours = createAsyncThunk(
  "task/patchTaskHours",
  async (data:IPatchTaskHours, {rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/task/${data.sprintId}`,
        data.taskObj
      );

      const responseObj = {
        date: response.data.day,
        currentDate: response.data.day.currentDay,
        hours: response.data.day.singleHoursWasted,
        wastedHours: response.data.newWastedHours,
        id: data.sprintId,
      };

      return responseObj;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

export const patchTitleSprint = createAsyncThunk(
  "task/patchTitleSprint",
  async (Data:IItem | IItem_, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/sprint/title/${Data.id}`,
        Data.title
      );

      const response = {
        id: Data.id,
        title: data,
      };

      return response;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);
