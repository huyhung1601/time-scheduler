import { Actiontype } from "../action-types";

export interface TaskProps {
  id?: string;
  name: string;
  start: string;
  end: string;
}
export interface CalendarProps {
  type: string;
  selectedDate: Date;
  dates?: string[] | [];
  timeline: { start: number; end: number };
  body?: Array<any>;
  by: string
}
interface GetTasks {
  type: Actiontype.getTasks;
  payload: TaskProps[];
}

interface DrawCalendar {
  type: Actiontype.drawCalendar;
  payload: { tasks: TaskProps[]; selectedDate: Date };
}

interface SetCalendar {
  type: Actiontype.setCalendar;
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
export type Action =
  | GetTasks
  | SetCalendar
  | DropItem
  | CreateTask
  | UpdateTask
  | DrawCalendar;
