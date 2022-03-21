import React from "react";
import useStyle from './styles'
import Controller from "./components/controller/Controller";
import TimeScheduler from "./components/timeScheduler/TimeScheduler";
import { useSelector } from "react-redux";
import { State } from "./store/reducers";
import TaskScheduler from "./components/taskScheduler/TaskScheduler";
import TaskDialog from "./components/taskDialog/TaskDialog";

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
        <TaskDialog />
      </div>
    </div>
  );
}

export default App;
