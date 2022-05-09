import useStyle from "./styles";
import Controller from "./components/controller/Controller";
import TimeScheduler from "./components/timeScheduler/TimeScheduler";
import { useDispatch, useSelector } from "react-redux";
import TaskScheduler from "./components/taskScheduler/TaskScheduler";
import TaskDialog from "./components/taskDialog/TaskDialog";
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
        <TaskDialog />
      </div>
    </div>
  );
}

export default App;
