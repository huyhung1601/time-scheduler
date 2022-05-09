import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
import { categoriesSlice } from "../features/categories/categoriesSlice";
import { calendarSlice } from "../features/calendar/calendarSlice";
import { tasksSlice } from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    tasks: tasksSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: new MiddlewareArray().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
