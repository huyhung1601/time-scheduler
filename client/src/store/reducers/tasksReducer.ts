import { Actiontype } from "../action-types";
import { Action, TaskProps } from "../actions";
import { converToNum, updateDateTime } from "../../utils/index";

interface StateProps {
  loading: Boolean;
  tasks: any;
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
      return { ...state, tasks: action.payload };

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
      console.log(calendarCT, dateOfTask);
      return {
        ...state,
        tasks: [
          ...state.tasks,
          yCompare
            ? calendarCT.type === "month"
              ? mCompare && newTask
              : calendarCT.dates.some(dateOfTask) && newTask
            : null,
        ],
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
        end: updateDateTime(dragItem.end, newD, newT),
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
      return { ...state };
    default:
      return state;
  }
};

export default tasksReducer;
