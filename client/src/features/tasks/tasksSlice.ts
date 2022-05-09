import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";
import {
  selectedTasks,
  serverCreateTask,
  serverUpdateTask,
} from "../../server";
import { converToNum, updateDateTime } from "../../utils";

interface ITasksState {
  loading: boolean;
  tasks: ITask[];
  droppedTask: ITask | null;
}

export interface ITask {
  id?: string;
  name: string;
  start: string;
  end: string;
  categoryId: string;
}

const initialState: ITasksState = {
  loading: false,
  tasks: [],
  droppedTask: null,
};

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async ({ selectedDate, type }: any) => {
    const res: ITask[] = await selectedTasks({ selectedDate, type });
    return res;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (newTask: ITask) => {
    const res: ITask = await serverCreateTask(newTask);
    return res;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: ITask) => {
    const res: ITask = await serverUpdateTask(task);
    return res;
  }
);
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    dropToChangeCategory: (
      state: ITasksState,
      action: PayloadAction<DropResult>
    ) => {
      const changingCategoryTask = state.tasks.find(
        (task: ITask) => task.id === action.payload.draggableId
      ) as ITask;
      const changedCategoryTask = {
        ...changingCategoryTask,
        categoryId: action.payload.destination!.droppableId,
      };
      state.tasks[state.tasks.indexOf(changingCategoryTask)] =
        changedCategoryTask;
    },
    dropToChangeDate: (
      state: ITasksState,
      action: PayloadAction<{ result: DropResult; calendar: any }>
    ) => {
      const { result, calendar } = action.payload;
      const { dates, type } = calendar;
      const { destination } = result;
      //index
      const dropIndex = converToNum(destination!.droppableId);
      //Set Date
      const dragItem = state.tasks.filter(
        (t: ITask) => t.id === result.draggableId
      )[0];
      const newDate = new Date(dragItem.start);
      // New Date, Month and year after drop
      const newD =
        type === "week"
          ? Number(dates[dropIndex[1]].split("/")[0])
          : dropIndex[0];
      const newM = Number(dates[dropIndex[1]].split("/")[1]);
      const newY = Number(dates[dropIndex[1]].split("/")[2]);
      //New Time after drop (in minutes)
      const newT =
        type === "week"
          ? newDate.getMinutes() -
            (newDate.getMinutes() > 30 ? 30 : 0) +
            dropIndex[0] * 30
          : newDate.getMinutes();
      const duration =
        new Date(dragItem.end).getTime() - new Date(dragItem.start).getTime();
      const draggedItem = {
        ...dragItem,
        start: updateDateTime(0, newT, newD, newM, newY),
        end: updateDateTime(duration, newT, newD, newM, newY),
      };

      state.tasks.forEach((t: ITask) =>
        t.id === draggedItem.id ? draggedItem : t
      );
      state.droppedTask = draggedItem;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTasks.fulfilled,
      (state: ITasksState, action: PayloadAction<ITask[]>) => {
        state.tasks = action.payload.sort(
          (a: ITask, b: ITask) =>
            new Date(a.start).getTime() - new Date(b.start).getTime()
        );
      }
    );
    builder.addCase(
      createTask.fulfilled,
      (state: ITasksState, action: PayloadAction<ITask>) => {
        state.tasks = [action.payload, ...state.tasks].sort(
          (a: ITask, b: ITask) =>
            new Date(a.start).getTime() - new Date(b.start).getTime()
        );
      }
    );
    builder.addCase(
      updateTask.fulfilled,
      (state: ITasksState, action: PayloadAction<ITask>) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      }
    );
  },
});

export const { dropToChangeCategory, dropToChangeDate } = tasksSlice.actions;
