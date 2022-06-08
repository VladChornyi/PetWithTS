import { createReducer } from "@reduxjs/toolkit";
import authOperations from "../auth/auth-operations";
import projectOperations from "../projects/projects-operations";
import {
  addSprint,
  changeSprintsTitle,
  deleteSprint,
  getProjectsSprints,
} from "../sprints/sprints-operations";
import { resetErrorAction } from "./error-action";

interface IErrorData {
  status: number;
  message: string;
}

interface IInitialState{
  error:null|IErrorData
}

type TSetError = (state:IInitialState, {payload}:any)=>IErrorData

const initialState:IInitialState = {error:null}

const setError:TSetError = (state:IInitialState, { payload }) => payload;


export const error = createReducer(initialState, (builder) => {
  builder
    .addCase(resetErrorAction, (state) => { state.error =null })
    .addCase(authOperations.register.rejected, (state, action) => { setError(state, action) })
    .addCase(authOperations.logIn.rejected, (state, action) => { setError(state, action) })
    .addCase(projectOperations.postProject.rejected, (state, action) => { setError(state, action) })
    .addCase(projectOperations.getProjects.rejected, (state,action)=>{setError(state, action)})
    .addCase(addSprint.rejected, (state,action)=>{setError(state, action)})
    .addCase(getProjectsSprints.rejected, (state, action) => {setError(state, action)})
    .addCase(changeSprintsTitle.rejected, (state, action)=>{setError(state, action)})
    .addCase(deleteSprint.rejected, (state, action)=>{setError(state, action)})
});
