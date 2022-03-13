import { Actiontype } from "../action-types";
import { Action } from "../actions";
import { getTime, getDay,getDate } from "../../utils/index";
const initialValue ={
  type: 'week',
  selectedDate: new Date(),
  dates: [],
  timeline: {start: 6, end: 11},
  body: []
}

const calendarReducer = (state:any =initialValue, action: Action) => {
  switch (action.type) {
    case Actiontype.setCalendar:
      const {selectedDate,timeline,type} = action.payload;
      const day = selectedDate.getDay();
      const date = selectedDate.getDate();
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();

      let arr = [];
      for (let d = 0; d < 7; d++) {
        arr[d] = (new Date(year,month,date -(day-d))).toLocaleDateString('en-GB')
      }
      return {...state, dates: [...arr], timeline: timeline, type: type, selectedDate: selectedDate}
    case Actiontype.drawCalendar:
      const {tasks} =action.payload
      const monthSelected = state.selectedDate.getMonth()
      const yearSelected = state.selectedDate.getFullYear()
      const firstDay = new Date(yearSelected,monthSelected,1).getDay()

      let table: any = [];
      if (state.type === 'week') {
        for (let i = 0; i < 24 * 2; i++) {
          table.push([]);
          for (let j = 0; j < 7; j++) {
            let slot = { id: `${i}:${j}`, tasks: [] };
            table[i].push(slot);
            tasks.map((task: any) => {
              getTime(task.start) === i &&
                getDay(task.start) === j &&
                table[i][j].tasks.every((x: any) => x.id !== task.id) &&
                table[i][j].tasks.push({
                  ...task,
                  start: new Date(task.start),
                  end: new Date(task.end),
                });
            });
          }
        }
      } else {
        for (let i=0;i<6;i++){
          table.push([])
          for(let j=0;j<7;j++){
            let slot = {id: `${i*7 +j +1- firstDay}:${j}`,tasks:[]}
            table[i].push(slot);
            tasks.map((task:any)=>{
              getDate(task.start) === (i*7 + j +1 - firstDay) && 
              table[i][j].tasks.every((x: any) => x.id !== task.id) && 
              table[i][j].tasks.push({
                ...task,
                start: new Date(task.start),
                end: new Date(task.end)
              })
            })
          }
        }
      }
      
      return{...state, body: table}
    default:
      // let ini = []
      // for (let i = 0; i < 7; i++) {
      //   ini[i] = (new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() -(new Date()).getDay()-i)).toLocaleDateString('en-GB')
      // }
      return {...state};
  }
};

export default calendarReducer;
