import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getError } from "../error/error-handler";

interface IProjectId {
  projectId: string;
  sprintData: {
    title: string;
    endDate: string | Date;
    duration: string | number;
  };
}

export const addSprint = createAsyncThunk(
  "sprint/addSprint",
  async ({ projectId, sprintData }:IProjectId, {rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/sprint/${projectId}`, sprintData);
      return data;
    } catch (error:any) {
        getError({
          error,
          cb: () => addSprint({ projectId, sprintData }),
          operationType: "sprint/addSprint",
        })
      return rejectWithValue(error.message);
    }
  }
);

export const getProjectsSprints = createAsyncThunk(
  "sprint/getSprints",
  async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/sprint/${projectId}`);
      return data;
    } catch (error:any) {
        getError({
          error,
          cb: () => getProjectsSprints(),
          operationType: "sprint/getSprints",
        })
      return rejectWithValue(error.message);
    }
  }
);

export const changeSprintsTitle = createAsyncThunk(
  "sprint/changeTitle",
  async (sprintId:string, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.patch(sprintId);
      return data;
    } catch (error:any) {
        getError({
          error,
          cb: () => changeSprintsTitle(sprintId),
          operationType: "sprint/changeTitle",
        })
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSprint = createAsyncThunk(
  "sprint/deleteSprint",
  async (sprintId:string, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/sprint/${sprintId}`);
      return sprintId;
    } catch (error:any) {
        getError({
          error,
          cb: () => deleteSprint(sprintId),
          operationType: "sprint/deleteSprint",
        })
      return rejectWithValue(error.message);
    }
  }
);
