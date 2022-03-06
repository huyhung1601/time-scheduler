import { Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";

const Controller = () => {
  const dispatch = useDispatch()
  const {setDates} = bindActionCreators(actionCreators,dispatch)
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  /**Dates pick-up */
  const handleDateChange = (date: any) => {
    setSelectedDate(date);    
  };
  
  useEffect(() => {    
    setDates(selectedDate)   
  }, [selectedDate]);

  return (
    <div className="controller">
      <Button onClick={() => handleDateChange(new Date())}>Today</Button>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Controller;
