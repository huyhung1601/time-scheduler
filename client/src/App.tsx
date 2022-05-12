import useStyle from "./styles";
import CalendarHeader from "./components/calendarHeader/CalendarHeader";
import { TimeScheduler } from "./components/time";
import { useDispatch, useSelector } from "react-redux";
import { TaskScheduler } from "./components/task";
import { TaskFormDialog } from "./components/taskFormDialog";
import { useEffect, useState } from "react";
import { getCategories } from "./features/categories/categoriesSlice";
import { RootState } from "./app/store";
import { useForm } from "./hooks/useForm";
import { createTask, ITask, updateTask } from "./features/tasks/tasksSlice";

export type TaskFormErrs = {
  task: string;
  start: string;
  end: string;
  categoryId: string;
};

const initialValue = {
  name: "",
  start: "",
  end: "",
  categoryId: "1",
};

function App() {
  /**MUI style */
  const classes = useStyle();
  /**Redux */
  const dispatch = useDispatch();
  const { calendar } = useSelector((state: RootState) => state);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    values,
    errs,
    handleChange,
    setValues,
    resetValues,
    validate,
    resetErrs,
  } = useForm(initialValue as ITask, {} as TaskFormErrs, "taskFormValidate");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onCloseDialog = () => {
    resetErrs();
    resetValues();
    handleCloseDialog();
  };
  const editTask = (task: ITask) => {
    setOpenDialog(true);
    setValues(task);
  };

  /**Create Task */
  const handleSubmit = (): void => {
    validate && validate(values);
    if (validate && validate(values)) {
      const newTask = values;
      newTask.id
        ? dispatch(updateTask(newTask))
        : dispatch(createTask(newTask));
      handleCloseDialog();
      resetValues();
      resetErrs();
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CalendarHeader handleOpenDialog={handleOpenDialog} />
      <div className={classes.tableContainer}>
        {calendar.by === "time" && (
          <TimeScheduler editTask={editTask} calendar={calendar} />
        )}
        {calendar.by === "task" && <TaskScheduler editTask={editTask} />}
      </div>
      <TaskFormDialog
        values={values}
        errs={errs}
        openDialog={openDialog}
        handleChange={handleChange}
        onCloseDialog={onCloseDialog}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
