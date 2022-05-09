import { Actiontype } from "../action-types";

export interface TaskProps {
  id?: string;
  name: string;
  start: string;
  end: string;
  categoryId: string;
}
export interface CalendarProps {
  type: string;
  selectedDate: Date;
  dates?: string[] | [];
  timeline: { start: number; end: number };
  body?: Array<any>;
  by: string;
}

interface GetCategories {
  type: Actiontype.getCategories;
  payload: any;
}

interface GetTasks {
  type: Actiontype.getTasks;
  payload: TaskProps[];
}

interface alignTasks {
  type: Actiontype.alignTasks;
  payload: { tasks: TaskProps[]; selectedDate: Date };
}

interface drawCalendar {
  type: Actiontype.drawCalendar;
  payload: CalendarProps;
}

interface DropItem {
  type: Actiontype.dropItem;
  payload: { result: any; calendar: any };
}

interface CreateTask {
  type: Actiontype.createTask;
  payload: any;
}

interface UpdateTask {
  type: Actiontype.updateTask;
  payload: TaskProps;
}

interface CreateCategory {
  type: Actiontype.createCategory;
  payload: any;
}
interface ClearNewCategoryTemp {
  type: Actiontype.clearNewCategoryTemp;
  payload: any;
}

interface ChangeCategory {
  type: Actiontype.changeCategory;
  payload: any;
}
export type Action =
  | GetTasks
  | drawCalendar
  | DropItem
  | CreateTask
  | UpdateTask
  | alignTasks
  | GetCategories
  | CreateCategory
  | ClearNewCategoryTemp
  | ChangeCategory;
