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
import React, {  useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { timeMarks } from "../../utils";
import useStyles from './styles'
import { State } from "../../store/reducers";
import { ToggleContext } from "../../context/Context";
const Controller = () => {
  /**MUI Theme */
  const classes = useStyles()
  /**Redux - Context*/
  const dispatch = useDispatch();
  const { setWeek, getTasks } = bindActionCreators(actionCreators, dispatch);
  const {calendar} = useSelector((state:State)=> state)
  const {openDialog,handleOpen} = useContext(ToggleContext)
  /**First value */
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [timeline, setTimeline] = useState({ start: 6, end: 11 });
  /**Dates pick-up */
  const handleDateChange = (date: any): void => {
    setSelectedDate(date);
  };
  /**Handle Change */
  const handleChange = (e: any): void => {    
    setTimeline({...timeline, [e.target.name]:e.target.value} )
  };
  /**Time marks */
  const tMarks = timeMarks(24)
  /**setCalendar */
  useEffect(() => {    
    setWeek(selectedDate,timeline);
  }, [selectedDate,timeline]);
  /**Get Tasks */
  useEffect(()=>{
    getTasks(calendar.dates)
  },[calendar.dates])
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
            if (x > timeline.end ){
              return null
            } else {
              return(
                <MenuItem key={index} value={x}>{x}:00</MenuItem>
              )
            }
            
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
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Button variant="outlined" color="primary" onClick={handleOpen} >New Task</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Controller;
