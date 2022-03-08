import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, { useContext, useState } from "react";
import { ToggleContext } from "../../context/Context";
import useStyles from './styles'

const TaskDialog = () => {
  /**MUI styles */
  const classes = useStyles()
  /**context */
  const { openDialog, handleClose } = useContext(ToggleContext);
  /**first value */  
  const [task,setTask] = useState('example')
  const[start, setStart] = useState(new Date())
  const[end, setEnd] = useState(new Date())
  /**Hanle Change */
  const handleChange = (e: any):void=>{
    setTask(e.target.value)
  }
  const handleStartDate = (date: any):void=>{
    setStart(date)
  }
  const handleEndDate = (date: any):void=>{
    setEnd(date)    
  }
  /**Create Task */
  const handleSubmit = () :void =>{
      const newTask={task,start,end};
      console.log(newTask.start.toISOString());
      if (handleClose) {handleClose()}
  }
  return (
    <Dialog className={classes.root} open={openDialog} onClose={handleClose}>
      <DialogContent>
        <TextField name="task" onChange={handleChange} value={task} label="Task" fullWidth />
        <div className={classes.dateContainer}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
          ampm={false}
            variant="inline"
            name='start'
            label="Start"
            value={start}
            onChange={handleStartDate}
            format="dd/MM/yyyy HH:mm"
          />
        </MuiPickersUtilsProvider>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
          ampm={false}
            variant="inline"
            name='start'
            label="End"
            value={end}
            onChange={handleEndDate}
            format="dd/MM/yyyy HH:mm"
          />
        </MuiPickersUtilsProvider> */}
          </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
