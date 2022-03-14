import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import { State } from "../../store/reducers";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ToggleContext } from "../../context/Context";
import { actionCreators } from "../../store";
import useStyles from "./styles";
import { TaskProps } from "../../store/actions";

type Errs = {
  task: string;
  start: string;
  end: string;
};
const initialValue = {
  task: "",
  start: "",
  end: "",
};
const TaskDialog = () => {
  /**MUI styles */
  const classes = useStyles();
  /**Redux && context */
  const dispatch = useDispatch();
  const { openDialog, handleClose } = useContext(ToggleContext);
  const { createTask } = bindActionCreators(actionCreators, dispatch);
  const { calendar } = useSelector((state: State) => state);
  /**first value */
  const [values, setValues] = useState<TaskProps>(initialValue);
  const [errs, setErrs] = useState({} as Errs);
  /**Hanle Change */
  const handleChange = (e: any): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
    /**validate(values) becasue compare start = end */
    validate({...values,[e.target.name]: e.target.value});
  };
  /**Create Task */
  const handleSubmit = (): void => {
    validate();
    if (validate()) {
      const newTask = values;
      createTask(newTask,calendar);
      handleClose && handleClose();
      setErrs({} as Errs);
      setValues(initialValue);
    }
  };
  /**Validate */
  const validate = (fieldValues = values) => {
    let temp = {} as Errs;   
    const compare = new Date(fieldValues.end!).getTime() - new Date(fieldValues.start!).getTime();
    if ("task" in fieldValues) {
      temp.task = fieldValues.task?.trim() === "" ? "please fill the task" : "";
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
    if (fieldValues == values)
      return Object.values(temp).every((x) => x === "");
  };
  /**Close Dialog */
  const closeDialog = () => {
    setValues(initialValue);
    setErrs({} as Errs);
    handleClose && handleClose();
  };
  return (
    <Dialog className={classes.root} open={openDialog} onClose={closeDialog}>
      <DialogContent>
        <TextField
          name="task"
          onChange={handleChange}
          value={values.task}
          label="Task"
          fullWidth
          {...(errs.task && { error: true, helperText: errs.task })}
        />
        <div className={classes.dateContainer}>
          <TextField
            label="start"
            type="datetime-local"
            value={values.start}
            name="start"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            {...(errs.start && { error: true, helperText: errs.start })}
          />
          <TextField
            label="end"
            type="datetime-local"
            value={values.end}
            name="end"
            onChange={handleChange}
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
