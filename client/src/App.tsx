import React from "react";
import useStyle from './styles'
import Controller from "./components/controller/Controller";
import TaskScheduler from "./components/TaskScheduler/TaskScheduler";
import TimeScheduler from "./components/timeScheduler/TimeScheduler";
import { useSelector } from "react-redux";
import { State } from "./store/reducers";

function App() {
  /**MUI style */
  const classes = useStyle()
  /**Redux */
  const {calendar} = useSelector((state: State) => state)
  return (
    <div className={classes.root}>
      <Controller />
      <div className={classes.tableContainer}>
        {calendar.by === 'time' && <TimeScheduler/>}
        {calendar.by === 'task' && <TaskScheduler />}
      </div>
    </div>
  );
}

export default App;
