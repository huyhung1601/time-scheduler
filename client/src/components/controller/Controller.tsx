import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  Grid,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { timeMarks } from "../../utils";
import useStyles from "./styles";
import { State } from "../../store/reducers";
import { ToggleContext } from "../../context/Context";
const Controller = () => {
  /**MUI Theme */
  const classes = useStyles();
  /**Redux - Context*/
  const dispatch = useDispatch();
  const { setCalendar, getTasks,drawCalendar } = bindActionCreators(actionCreators, dispatch);
  const { calendar,tasks } = useSelector((state: State) => state);
  const { handleOpen } = useContext(ToggleContext);
  /**First value */
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [timeline, setTimeline] = useState({ start: 6, end: 11 });
  const [type,setType] = useState('week')
  /**Dates pick-up */
  const handleDateChange = (date: any): void => {
    setSelectedDate(date);
  };
  /**Handle Change */
  const handleChange = (e: any): void => {
    setTimeline({ ...timeline, [e.target.name]: e.target.value });
  };
  /**Choose calendar */
  const chooseCalendar =(type: string): void =>{
    setType(type)
    type == 'month' ? setTimeline({start:0, end: 5}) : setTimeline({start:6, end: 11})
  }
  /**Time marks */
  const tMarks = timeMarks(24);
  /**setCalendar */
  useEffect(() => {
    setCalendar({selectedDate, timeline,type});
  }, [selectedDate, timeline,type]);
  /**Get Tasks */
  useEffect(() => {
    const query = {type: type, selectedDate: selectedDate.toISOString()}
    getTasks(query);
  }, [calendar.dates]);
  /**Draw Calendar */
  useLayoutEffect(()=>{
    drawCalendar(tasks.tasks,selectedDate)
  },[tasks.tasks])
  
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Button onClick={() => handleDateChange(new Date())}>Today</Button>
            <FormControl>
              <InputLabel>Start</InputLabel>
              <Select
                name="start"
                value={timeline.start}
                onChange={handleChange}
                disabled={calendar.type == 'month'}
              >
                {tMarks.map((x: any, index: number) => {
                  if (x > timeline.end) {
                    return null;
                  } else {
                    return (
                      <MenuItem key={index} value={x}>
                        {x}:00
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>End</InputLabel>
              <Select
                value={timeline.end}
                name="end"
                onChange={(e) => handleChange(e)}
                disabled={calendar.type == 'month'}

              >
                {tMarks.map((x: any, index: number) => {
                  if (x < timeline.start + 5) {
                    return null;
                  } else {
                    return (
                      <MenuItem key={index} value={x}>
                        {x}:00
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            <Button variant="outlined" color="primary" onClick={handleOpen}>
              New Task
            </Button>
          </Grid>
          <Grid item sm />
          <Grid item>
            <Button onClick={()=>chooseCalendar('week')}>Week</Button>
            <Button onClick={()=>chooseCalendar('month')}>Month</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Controller;
