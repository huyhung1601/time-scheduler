import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
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
import useStyles from './styles'
const Controller = () => {
  /**MUI Theme */
  const classes = useStyles()
  /**Redux */
  const dispatch = useDispatch();
  const { setWeek, getTasks } = bindActionCreators(actionCreators, dispatch);
  /**First value */
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
  /**Fetch data */
  useEffect(() => {
    setWeek(selectedDate,timeline);
    getTasks(fakeData);
  }, [selectedDate,timeline]);

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
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
      <MuiPickersUtilsProvider  utils={DateFnsUtils}>
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
      </Toolbar>
    </AppBar>
  );
};

export default Controller;
