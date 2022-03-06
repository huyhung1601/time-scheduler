import { Actiontype } from "../action-types";
import { Action } from "../actions";

const initialValue ={
  type: 'week',
  dates: [],
  timeline: {start: 6, end: 11}
}

const datesReducer = (state:any =initialValue, action: Action) => {
  switch (action.type) {
    case Actiontype.setWeek:
      const {selectedDate,timeline} = action.payload;
      const day = selectedDate.getDay();
      const date = selectedDate.getDate();
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      let arr = [];
      for (let d = 0; d < 7; d++) {
        arr[d] = (new Date(year,month,date -(day-d))).toLocaleDateString('en-GB')
      }
      return {...state, dates: [...arr], timeline: timeline}
      
    default:
      
      return state;
  }
};

export default datesReducer;
