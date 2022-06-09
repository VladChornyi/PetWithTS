export interface IItem {
  id: string;
  _id: string;
  title: string;
}

export interface IListProps {
  title?: string;
  list: IItem[];
    path: string;
    linkTo?:string
}