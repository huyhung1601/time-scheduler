import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { State } from "../../store/reducers";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useTaskDialogContext } from "../../context/TaskDialogContext";
import { actionCreators } from "../../store";
import useStyles from "./styles";
import { TaskProps } from "../../store/actions";

type Errs = {
  task: string;
  start: string;
  end: string;
};

const TaskDialog = () => {
  /**MUI styles */
  const classes = useStyles();
  /**Redux && context */
  const dispatch = useDispatch();
  const { task,openDialog, handleClose, handleTaskChange } = useTaskDialogContext()
  const { updateTask, createTask } = bindActionCreators(actionCreators, dispatch);
  const { calendar } = useSelector((state: State) => state);
  /**Hanle Change */
  const onChange = (e: any): string |void => {
    let name = e.target.name
    let value = e.target.value
    handleTaskChange && handleTaskChange(name,value)
    /**validate(values) becasue compare start = end */
    validate({...task,[e.target.name]: e.target.value});
  };
  /**Create Task */
  const handleSubmit = (): void => {
    validate();
    if (validate()) {
      const newTask = task;
      newTask.id ? updateTask(newTask) :createTask(newTask,calendar);
      handleClose && handleClose();
      setErrs({} as Errs);
    }
  };
  /**Validate */
  const [errs, setErrs] = useState({} as Errs);
  const validate = (fieldValues = task) => {
    let temp = {} as Errs;   
    const compare = new Date(fieldValues.end!).getTime() - new Date(fieldValues.start!).getTime();
    if ("name" in fieldValues) {
      temp.task = fieldValues.name?.trim() === "" ? "please fill the task" : "";
    }
    if ("start" in fieldValues) {
      temp.start =
        fieldValues.start?.trim() === ""
          ? "please pick start time" : compare && compare <0 ? 'start time must before end time'
          : "";
    }
    if ("end" in fieldValues) {
      temp.end =
        fieldValues.end?.trim() === ""
          ? "please pick end time": compare && compare <0 ? 'end time must be after start time'
          : "";
    }
    setErrs({ ...temp });
    if (fieldValues == task)
      return Object.values(temp).every((x) => x === "");
  };
  /**Close Dialog */
  const closeDialog = () => {
    setErrs({} as Errs);
    handleClose && handleClose();
  };
  return (
    <Dialog className={classes.root} open={openDialog} onClose={closeDialog}>
      <DialogContent>
        <TextField
          name="name"
          onChange={onChange}
          value={task.name}
          label="Task"
          fullWidth
          {...(errs.task && { error: true, helperText: errs.task })}
        />
        <div className={classes.dateContainer}>
          <TextField
            label="start"
            type="datetime-local"
            value={task.start}
            name="start"
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            {...(errs.start && { error: true, helperText: errs.start })}
          />
          <TextField
            label="end"
            type="datetime-local"
            value={task.end}
            name="end"
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            {...(errs.end && { error: true, helperText: errs.end })}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
