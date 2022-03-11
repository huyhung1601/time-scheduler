import { Actiontype } from "../action-types";
import { Action } from "../actions";
import { getTime, getDay, converToNum } from "../../utils/index";

const tasksReducer = (state: any = [], action: Action) => {
  switch (action.type) {
    //Draw timetable
    // case Actiontype.drawTable:
    //   for (let t = 0; t < 24 * 2; t++) {
    //     state.push([]);
    //     for (let d = 0; d < 7; d++) {
    //       let slot = {id: `${t}${d}`,tasks:[]}
    //       state[t].push(slot);
    //     }
    //   }
    //   return [...state];

    /**Create Task */
    case Actiontype.createTask:
      const {task ,calendar}= action.payload
      const date = new Date(task.start)
      const time = Math.ceil((date.getHours() * 60 + date.getMinutes())/30)
      const day = date.getDay()
      const newTask = {...task,start: new Date(task.start), end: new Date(task.end)}
    return [...state,calendar.dates.includes(date.toLocaleDateString('en-gb')) && state[time][day].tasks.push(newTask)]
    /**Draw table and mark items */
    
    case Actiontype.getTasks:
      let arr: any = [];
      for (let i = 0; i < 24 * 2; i++) {
        arr.push([]);
        for (let j = 0; j < 7; j++) {
          let slot = { id: `${i}:${j}`, tasks: [] };
          arr[i].push(slot);
          action.payload.map((task: any) => {
            getTime(task.start) === i &&
              getDay(task.start) === j &&
              arr[i][j].tasks.every((x: any) => x.id !== task.id) &&
              arr[i][j].tasks.push({
                ...task,
                start: new Date(task.start),
                end: new Date(task.end),
              });
          });
        }
      }
      return [...arr];
    /**Drag Item */
    case Actiontype.dropItem:
      const { result, dates } = action.payload;
      const { source, destination } = result;
      const dragIndex = converToNum(source.droppableId);
      const dropIndex = converToNum(destination.droppableId);
      const dragItem = state[dragIndex[0]][dragIndex[1]].tasks[source.index];

      //Set Date
      const draggedItem = {
        ...dragItem,
        start: new Date(
          dragItem.start.setDate(Number(dates[dropIndex[1]].split("/")[0]))
        ),
        end: new Date(
          dragItem.end.setDate(Number(dates[dropIndex[1]].split("/")[0]))
        ),
      };

      //Set Time
      dragItem.start.setHours(
        0,
        dragItem.start.getMinutes() -
          (dragItem.start.getMinutes() > 30 ? 30 : 0) +
          dropIndex[0] * 30
      );
      //Remove from previous time slot
      state[dragIndex[0]][dragIndex[1]].tasks.splice(source.index, 1);
      //Add to new time slot
      state[dropIndex[0]][dropIndex[1]].tasks.splice(
        destination.index,
        0,
        dragItem
      );
      return [...state];
    /**Update Task */
        case Actiontype.updateTask:
        return[...state]
    default:
      return state;
  }
};

export default tasksReducer;
