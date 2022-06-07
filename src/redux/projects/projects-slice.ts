import {IProjectState } from './../types/typesStore';
import { createSlice } from "@reduxjs/toolkit";
import projectOperations, { updateProjectTitle } from "./projects-operations";


interface IProjectInitialState{
  items: IProjectState[],
  isLoading: boolean
}

const initialState:IProjectInitialState = {
  items: [],
  isLoading: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectLogOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      projectOperations.getProjects.fulfilled,
      (state, { payload }) => {
        if (payload.message === "No projects found") return initialState;
        state.items = [...payload];
      }
    );
    builder.addCase(
      projectOperations.postProject.fulfilled,
      (state, action) => {
        state.items.push(action.payload);
      }
    );
    builder.addCase(
      projectOperations.deleteProject.fulfilled,
      (state, { payload }) => {
        state.items = [
          ...state.items.filter((item) => {
            const itemId = item._id ?? item.id;
            return itemId !== payload;
          }),
        ];
      }
    );
    builder.addCase(
      projectOperations.addMember.fulfilled,
      (state, { payload }) => {
        const currentProject = state.items.filter((item) => {
          const itemId = item._id ?? item.id;
          return itemId === payload.id;
        });
        const idx = state.items.indexOf(currentProject[0]);
        state.items[idx].members = [...payload.data.newMembers];
      }
    );
    builder.addCase(updateProjectTitle.fulfilled, (state, { payload }) => {
      state.items = state.items.map((project) => {
        if (project._id ?? project.id === payload.id) {
          project.title = payload.title.newTitle;
        }
        return project;
      });
    });
  },
});

export const { projectLogOut } = projectsSlice.actions;
export default projectsSlice.reducer;
