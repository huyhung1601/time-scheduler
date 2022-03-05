import { Actiontype } from "../action-types";
import { Action } from "../actions";
import {getTime,getDay,converToNum} from '../../utils/index'


const tasksReducer = (state: any = [], action: Action) => {
  switch (action.type) {
    //Draw timetable
    case Actiontype.drawTable:
      for (let t = 0; t < 24 * 2; t++) {
        state.push([]);
        for (let d = 0; d < 7; d++) {
          let slot = {id: `${t}${d}`,tasks:[]}
          state[t].push(slot);
        }
      }
      return [...state];
    //Fetch data
    case Actiontype.getTasks: 
      for (let i = 0; i < 24 * 2; i++) {
        for (let j = 0; j < 7; j++) {
          action.payload.map((task: any) => {
            getTime(task.start) === i && getDay(task.start) === j
              && state[i][j].tasks.every((x:any)=>x.id !== task.id) && state[i][j].tasks.push(task)                         
          });
        }
      }
      return [...state];
    //Drag Item
    case Actiontype.dragItem:
      const {source,destination} = action.payload
      const dragIndex= converToNum(source.droppableId)
      const dropIndex = converToNum(destination.droppableId)
      const dragItem = state[dragIndex[0]][dragIndex[1]].tasks[source.index]
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
