import { Actiontype } from "../action-types";
import { Action } from "../actions";

const datesReducer = (state: any = [], action: Action) => {
  switch (action.type) {
    case Actiontype.setDates:
      const selectedDate = action.payload;
      const day = selectedDate.getDay();
      const date = selectedDate.getDate();
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      let arr = [];
      for (let d = 0; d < 7; d++) {
        arr[d] = (new Date(year,month,date -(day-d))).toLocaleDateString('en-GB')
      }
      return [...arr]
      
    default:
      
      return state;
  }
};

export default datesReducer;
