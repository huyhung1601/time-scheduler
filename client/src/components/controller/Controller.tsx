import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { fakeData } from "../../utils"
import { timeMarks } from "../../utils";

const Controller = () => {
  const dispatch = useDispatch();
  const { setWeek, getTasks } = bindActionCreators(actionCreators, dispatch);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [timeline, setTimeline] = useState({ start: 6, end: 11 });
  /**Dates pick-up */
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  /**Handle Change */
  const handleChange = (e: any): void => {    
    setTimeline({...timeline, [e.target.name]:e.target.value} )
  };
  /**Time marks */
  const tMarks = timeMarks(24)
  useEffect(() => {
    setWeek(selectedDate,timeline);
    getTasks(fakeData);
  }, [selectedDate,timeline]);

  return (
    <div className="controller">
      <Button onClick={() => handleDateChange(new Date())}>Today</Button>
      <FormControl>
        <InputLabel >Start</InputLabel>
        <Select
          name='start'
          value={timeline.start}
          onChange={handleChange}
        >
          {tMarks.map((x:any,index:number)=>{
            return(
              <MenuItem key={index} value={x}>{x}:00</MenuItem>
            )
          })}
        </Select>
      </FormControl>      
      <FormControl>
        <InputLabel >End</InputLabel>
        <Select
          value={timeline.end}
          name='end'
          onChange={e=>handleChange(e)}
        >
          {tMarks.map((x:any,index:number)=>{
             if (x < timeline.start +5) {
               return null
             } else {
               return(
                <MenuItem key={index} value={x}>{x}:00</MenuItem>
               )
             }
          })}
        </Select>
      </FormControl>
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
