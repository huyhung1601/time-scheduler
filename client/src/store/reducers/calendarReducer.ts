import { Actiontype } from "../action-types";
import { Action } from "../actions";

const initialValue ={
  type: 'week',
  dates: [],
  timeline: {start: 6, end: 11}
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
      return {...state, dates: [...arr], timeline: timeline, type: type}
      
    default:
      // let ini = []
      // for (let i = 0; i < 7; i++) {
      //   ini[i] = (new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate() -(new Date()).getDay()-i)).toLocaleDateString('en-GB')
      // }
      return {...state};
  }
};

export default calendarReducer;
