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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeMarks } from "../../utils";
import useStyles from "./styles";
import { useTaskDialogContext } from "../../context/TaskDialogContext";
import { RootState } from "../../app/store";
import { getTasks } from "../../features/tasks/tasksSlice";
import {
  drawCalendar,
  alignTasks,
} from "../../features/calendar/calendarSlice";

const Controller = () => {
  /**MUI Theme */
  const classes = useStyles();
  /**Redux - Context*/
  const dispatch = useDispatch();
  const { calendar, tasks } = useSelector((state: RootState) => state);
  const { handleOpen } = useTaskDialogContext();
  /**First value */
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [timeline, setTimeline] = useState({ start: 6, end: 11 });
  const [type, setType] = useState("week");
  const [by, setBy] = useState("time");
  /**Dates pick-up */
  const handleDateChange = (date: any): void => {
    setSelectedDate(date);
  };
  /**Handle Change */
  const handleTimeLineChange = (e: any): void => {
    setTimeline({ ...timeline, [e.target.name]: e.target.value });
  };
  /**Choose calendar */
  const chooseCalendar = (type: string): void => {
    setType(type);
  };
  /**Arranged by */
  const arrangedBy = (e: any): void => {
    setBy(e.target.value);
  };
  /**Time marks */
  const tMarks = timeMarks(24);
  /**drawCalendar */
  useEffect(() => {
    dispatch(drawCalendar({ selectedDate, timeline, type, by }));
  }, [selectedDate, timeline, type, by, dispatch]);
  /**Get Tasks */
  useEffect(() => {
    const query = { type: type, selectedDate: selectedDate.toISOString() };
    dispatch(getTasks(query));
  }, [type, selectedDate, dispatch]);
  /**Draw Calendar */
  useEffect(() => {
    dispatch(alignTasks(tasks.tasks));
  }, [tasks.tasks, dispatch]);

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
                onChange={handleTimeLineChange}
                disabled={calendar.type === "month" || calendar.by === "task"}
              >
                {calendar.by === "time" &&
                  tMarks.map((x: any, index: number) => {
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
                onChange={handleTimeLineChange}
                disabled={calendar.type === "month" || calendar.by === "task"}
              >
                {calendar.by === "time" &&
                  tMarks.map((x: any, index: number) => {
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
            <FormControl>
              <Select name="by" value={calendar.by} onChange={arrangedBy}>
                <MenuItem value="time">Time</MenuItem>
                <MenuItem value="task">Task</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={() => chooseCalendar("week")}>Week</Button>
            <Button onClick={() => chooseCalendar("month")}>Month</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Controller;
