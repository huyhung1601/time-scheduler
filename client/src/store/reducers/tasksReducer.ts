import { Actiontype } from "../action-types";
import { Action } from "../actions";
import {getTime,getDay,converToNum, calcMinutes} from '../../utils/index'


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

    /**Draw table and mark items */
    case Actiontype.getTasks:
      let arr: any = []
      for (let i = 0; i < 24 * 2; i++) {
        arr.push([]);
        for (let j = 0; j < 7; j++) {
          let slot = {id: `${i}:${j}`,tasks:[]}
          arr[i].push(slot);
          action.payload.map((task: any) => {
            getTime(task.start) === i && getDay(task.start) === j
              && arr[i][j].tasks.every((x:any)=>x.id !== task.id) && arr[i][j].tasks.push(task)
          });
        }
      }
      return [...arr];
    //Drag Item
    case Actiontype.dragItem:
      const {result, dates} = action.payload    
      const {source,destination} = result
      const dragIndex= converToNum(source.droppableId)
      const dropIndex = converToNum(destination.droppableId)
      const dragItem = state[dragIndex[0]][dragIndex[1]].tasks[source.index]
      const draggedItem = {...dragItem, start: dragItem.start.setDate(dates[dropIndex[1]].split('/')[0]), end:dragItem.end.setDate(dates[dropIndex[1]].split('/')[0])}
      dragItem.start.setHours(0,dragItem.start.getMinutes() - (dragItem.start.getMinutes() > 30? 30 : 0) + dropIndex[0] * 30)
      //Remove from previous time slot
      state[dragIndex[0]][dragIndex[1]].tasks.splice(source,1)
      //Add to new time slot
      state[dropIndex[0]][dropIndex[1]].tasks.splice(destination.index,0,dragItem)
      return[...state]
    default:
      return state;
  }
};

export default tasksReducer;
