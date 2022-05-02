import { Dispatch } from "redux";
import {
  addNewTask,
  selectedTasks,
  serverCreateCategory,
  serverGetCategories,
  serverUpdateTask,
} from "../../server";
import { Actiontype } from "../action-types";
import { CalendarProps, TaskProps } from "../actions";

export const setCalendar = ({
  selectedDate,
  timeline,
  type,
  by,
}: CalendarProps) => {
  return async (dispath: Dispatch) => {
    dispath({
      type: Actiontype.setCalendar,
      payload: { selectedDate, timeline, type, by },
    });
  };
};

export const getTasks = ({ selectedDate, type }: any) => {
  return async (dispatch: Dispatch) => {
    const res = await selectedTasks({ selectedDate, type });
    dispatch({
      type: Actiontype.getTasks,
      payload: res,
    });
  };
};

export const drawCalendar = (tasks: TaskProps[], selectedDate: Date) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Actiontype.drawCalendar,
      payload: { tasks, selectedDate },
    });
  };
};

export const dropItem = (result: any, calendar: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Actiontype.dropItem,
      payload: { result, calendar },
    });
  };
};

export const changeCategory = (result: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: Actiontype.changeCategory,
      payload: { result },
    });
  };
};

export const createTask = (newTask: TaskProps, calendar: any) => {
  return async (dispatch: Dispatch) => {
    const res = await addNewTask(newTask);
    dispatch({
      type: Actiontype.createTask,
      payload: { res, calendar },
    });
  };
};

export const updateTask = (updatedTask: TaskProps) => {
  return async (dispatch: Dispatch) => {
    const res = await serverUpdateTask(updatedTask);
    dispatch({
      type: Actiontype.updateTask,
      payload: res,
    });
  };
};

export const getCategories = () => {
  return async (dispatch: Dispatch) => {
    const res = await serverGetCategories();
    dispatch({
      type: Actiontype.getCategories,
      payload: res,
    });
  };
};

export const createCategory = (category: any) => {
  return async (dispatch: Dispatch) => {
    const res = await serverCreateCategory(category);
    dispatch({
      type: Actiontype.createCategory,
      payload: res,
    });
  };
};
