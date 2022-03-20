import { Actiontype } from "../action-types";
import { Action, TaskProps } from "../actions";
import { converToNum, updateDateTime } from "../../utils/index";

interface StateProps {
  loading: Boolean;
  tasks: TaskProps[];
  modifiedTask: TaskProps;
}

const initialState: StateProps = {
  loading: false,
  tasks: [],
  modifiedTask: {} as TaskProps,
};
const tasksReducer = (state: StateProps = initialState, action: Action) => {
  switch (action.type) {
    /**Get Tasks */
    case Actiontype.getTasks:
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
      const { dates, type, selectedDate } = calendar;
      const { source, destination } = result;
      //index
      const dropIndex = converToNum(destination.droppableId);
      //Set Date
      const dragItem = state.tasks.filter(
        (t: TaskProps) => t.id === result.draggableId
      )[0];
      const newDate = new Date(dragItem.start);
      const newD =
        type === "week"
          ? Number(dates[dropIndex[1]].split("/")[0])
          : dropIndex[0];
      const newT =
        type === "week"
          ? newDate.getMinutes() -
            (newDate.getMinutes() > 30 ? 30 : 0) +
            dropIndex[0] * 30
          : null;
      const draggedItem = {
        ...dragItem,
        start: updateDateTime(dragItem.start, newD, newT),
        end: updateDateTime(dragItem.end, newD + 1, newT),
      };
      return {
        ...state,
        tasks: state.tasks.map((t: TaskProps) =>
          t.id === draggedItem.id ? draggedItem : t
        ),
        modifiedTask: draggedItem,
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
