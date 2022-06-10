import { RootState } from './../store';

const getSprint = (state:RootState) => state.sprints.items;
const getTasks = (state:RootState) => state.tasks.items;

 const tasksSelectors = {
  getTasks,
  getSprint,
};
export default tasksSelectors;