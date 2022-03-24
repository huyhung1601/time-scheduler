import useStyle from './styles'
import Controller from "./components/controller/Controller";
import TimeScheduler from "./components/timeScheduler/TimeScheduler";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./store/reducers";
import TaskScheduler from "./components/taskScheduler/TaskScheduler";
import TaskDialog from "./components/taskDialog/TaskDialog";
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { actionCreators } from './store';

function App() {
  /**MUI style */
  const classes = useStyle()
  /**Redux */
  const dispatch = useDispatch()
  const {getCategories} = bindActionCreators(actionCreators,dispatch)
  const {calendar} = useSelector((state: State) => state)
  useEffect(()=>{
    getCategories()
  },[])
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
