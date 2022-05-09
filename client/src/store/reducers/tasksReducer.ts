import { Actiontype } from "../action-types";
import { Action, TaskProps } from "../actions";
import { converToNum, updateDateTime } from "../../utils/index";
import { ITask } from "../../context/TaskDialogContext";

interface StateProps {
  loading: Boolean;
  tasks: TaskProps[];
  modifiedTask: TaskProps;
}

const initialState: StateProps = {
  loading: false,
  tasks: [] as TaskProps[],
  modifiedTask: {} as TaskProps,
};
const tasksReducer = (state: any = initialState, action: Action) => {
  switch (action.type) {
    /**Get Tasks */
    case Actiontype.getTasks:
      const dateTime = new Date().getTime();

      return {
        ...state,
        tasks: action.payload.sort(
          (a: TaskProps, b: TaskProps) =>
            new Date(a.start).getTime() - new Date(b.start).getTime()
        ),
      };

    /**Create Task */
    case Actiontype.createTask:
      const calendarCT = action.payload.calendar;
      const newTask = action.payload.res;
      //Compare year and month
      const yOfNewTask = new Date(newTask.start).getFullYear();
      const mOfNewTask = new Date(newTask.start).getMonth();
      const yOfCal = new Date(calendarCT.selectedDate).getFullYear();
      const mOfCal = new Date(calendarCT.selectedDate).getMonth();
      const yCompare = yOfNewTask === yOfCal;
      const mCompare = mOfNewTask === mOfCal;
      const dateOfTask = new Date(newTask.start).toLocaleDateString("en-gb");

      return {
        ...state,
        tasks: [
          ...state.tasks,
          yCompare &&
            mCompare &&
            ((calendarCT.type === "month" && newTask) ||
              (calendarCT.type === "week" &&
                calendarCT.dates.includes(dateOfTask) &&
                newTask)),
        ].sort(
          (a: TaskProps, b: TaskProps) =>
            new Date(a.start).getTime() - new Date(b.start).getTime()
        ),
      };

    /**Drop Item */
    case Actiontype.dropItem:
      const { result, calendar } = action.payload;
      const { dates, type } = calendar;
      const { destination } = result;
      //index
      const dropIndex = converToNum(destination.droppableId);
      //Set Date
      const dragItem = state.tasks.filter(
        (t: TaskProps) => t.id === result.draggableId
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
      return {
        ...state,
        tasks: state.tasks.map((t: TaskProps) =>
          t.id === draggedItem.id ? draggedItem : t
        ),
        modifiedTask: draggedItem,
      };
    /**Change Category */
    case Actiontype.changeCategory:
      const changingCategoryTask = state.tasks.filter(
        (task: ITask) => task.id === action.payload.result.draggableId
      )[0];
      const changedCategoryTask = {
        ...changingCategoryTask,
        categoryId: action.payload.result.destination.droppableId,
      };
      return {
        ...state,
        tasks: state.tasks.map((t: ITask) =>
          t.id === changedCategoryTask.id ? changedCategoryTask : t
        ),
        modifiedTask: changedCategoryTask,
      };
    /**Update Task */
    case Actiontype.updateTask:
      return {
        ...state,
        tasks: state.tasks
          .map((t: TaskProps) =>
            t.id === action.payload.id ? action.payload : t
          )
          .sort(
            (a: TaskProps, b: TaskProps) =>
              new Date(a.start).getTime() - new Date(b.start).getTime()
          ),
      };
    default:
      return state;
  }
};

export default tasksReducer;
