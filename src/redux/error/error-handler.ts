import { AppDispatch } from './../store';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authOperations } from "../auth";

interface IErrorData {
  status: number;
  message: string;
}
interface IReturnError {
  status: number;
  message: string;
}
interface IErrorWithStatus {
  (error: IErrorData): IReturnError;
}
interface IGetError {
  error: IErrorData;
  cb: () => any;
  operationType: string;
}
const getErrorWithStatus:IErrorWithStatus = (error) => {
  error.status = +error.message.slice(-3);
  return error;
};

export const getError =
  ({ error, cb, operationType }: IGetError) =>
  (dispatch: AppDispatch) => {
    const operation = createAsyncThunk(
      operationType,
      async (_, { rejectWithValue }) => {
        const { status, message } = getErrorWithStatus(error);
        if (status === 401) {
          authOperations.refreshToken(cb);
        }
        return rejectWithValue({ status, message });
      }
    );
    dispatch(operation());
  };
