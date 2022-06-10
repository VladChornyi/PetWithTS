import { ISprint } from "../../../redux/sprints/sprints-slice";
import { IProjectState } from "../../../redux/types/typesStore";


export interface IListProjectProps {
  title?: string;
  list?: IProjectState[];
  path?: string;
  linkTo?:string
}
export interface IListSprintProps{
  title?: string;
  list?: ISprint[];
  path?: string;
  linkTo?:string
}
