import useStyle from "./styles";
import Controller from "./components/calendarHeader/CalendarHeader";
import { TimeScheduler } from "./components/time";
import { useDispatch, useSelector } from "react-redux";
import { TaskScheduler } from "./components/task";
import { TaskFormDialog } from "./components/taskForm";
import { useEffect } from "react";
import { getCategories } from "./features/categories/categoriesSlice";
import { RootState } from "./app/store";

function App() {
  /**MUI style */
  const classes = useStyle();
  /**Redux */
  const dispatch = useDispatch();
  const { calendar } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Controller />
      <div className={classes.tableContainer}>
        {calendar.by === "time" && <TimeScheduler calendar={calendar} />}
        {calendar.by === "task" && <TaskScheduler />}
        <TaskFormDialog />
      </div>
    </div>
  );
}

export default App;
