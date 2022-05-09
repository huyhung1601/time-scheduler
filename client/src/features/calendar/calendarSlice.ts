import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTime,
  getDay,
  getDate,
  daysCurrentMonth,
  firstDayOfMonth,
} from "../../utils";
import { ITask } from "../tasks/tasksSlice";

export interface ICalendar {
  type: "week" | "month";
  selectedDate: Date;
  dates: string[];
  timeline: { start: number; end: number };
  body: any[];
  by: string;
}

const initialState: ICalendar = {
  type: "week",
  selectedDate: new Date(),
  dates: [],
  timeline: { start: 6, end: 11 },
  body: [],
  by: "time",
};

export const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    drawCalendar: (state: ICalendar, action: PayloadAction<any>) => {
      const { selectedDate, timeline, type, by } = action.payload;
      const day = selectedDate.getDay();
      const date = selectedDate.getDate();
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      const startOfWeek = new Date(year, month, date - day).getTime();
      const endOfWeek = new Date(
        year,
        month,
        date - day + 7,
        0,
        0,
        -1
      ).getTime();
      const startOfMonth = new Date(year, month, 1).getTime();
      const endOfMonth = new Date(year, month + 1, 1, 0, 0, -1).getTime();
      const daysOfMonth = new Date(year, month + 1, 0).getDate();
      const weeks = Math.ceil(
        (daysCurrentMonth(selectedDate) + firstDayOfMonth(selectedDate)) / 7
      );
      let arr = [];
      for (let d = 0; d < (type === "week" ? 7 : daysOfMonth); d++) {
        arr[d] =
          type === "week"
            ? new Date(year, month, date - (day - d)).toLocaleDateString(
                "en-GB"
              )
            : new Date(year, month, d + 1).toLocaleDateString("en-gb");
      }

      state.dates = [...arr];
      state.timeline =
        (by === "time" &&
          (type === "week" ? timeline : { start: 0, end: weeks })) ||
        (by === "task" &&
          (type === "week"
            ? { start: startOfWeek, end: endOfWeek }
            : { start: startOfMonth, end: endOfMonth }));
      state.type = type;
      state.selectedDate = selectedDate;
      state.by = by;
    },
    alignTasks: (state: ICalendar, action: PayloadAction<ITask[]>) => {
      const tasks = action.payload;
      const yearOfDate = (date: Date) => {
        return new Date(date).getFullYear();
      };
      const monthOfDate = (date: Date) => {
        return new Date(date).getMonth();
      };
      const yearOfSelectedDate = yearOfDate(state.selectedDate);
      const monthOfSelectedDate = monthOfDate(state.selectedDate);
      const filteredTask = action.payload.filter(
        (task: ITask) =>
          yearOfSelectedDate === yearOfDate(new Date(task.start)) &&
          monthOfSelectedDate === monthOfDate(new Date(task.start)) &&
          (state.type === "week"
            ? state.dates.includes(
                new Date(task.start).toLocaleDateString("en-gb")
              )
            : null)
      );
      const firstDay = firstDayOfMonth(state.selectedDate);

      let table: any = [];
      if (state.by === "time") {
        if (state.type === "week") {
          for (let i = 0; i < 24 * 2; i++) {
            table.push([]);
            for (let j = 0; j < 7; j++) {
              let slot = { id: `${i}:${j}`, tasks: [] };
              table[i].push(slot);
              filteredTask.forEach((task: any) => {
                getTime(task.start) === i &&
                  getDay(task.start) === j &&
                  table[i][j].tasks.every((x: any) => x.id !== task.id) &&
                  table[i][j].tasks.push(task);
              });
            }
          }
        } else {
          for (let i = 0; i < state.timeline.end; i++) {
            table.push([]);
            for (let j = 0; j < 7; j++) {
              let slot = { id: `${i * 7 + j + 1 - firstDay}:${j}`, tasks: [] };
              table[i].push(slot);
              tasks.map((task: any) => {
                getDate(task.start) === i * 7 + j + 1 - firstDay &&
                  table[i][j].tasks.every((x: any) => x.id !== task.id) &&
                  table[i][j].tasks.push(task);
              });
            }
          }
        }
      }
      state.body = table;
    },
  },
});

export const { drawCalendar, alignTasks } = calendarSlice.actions;
