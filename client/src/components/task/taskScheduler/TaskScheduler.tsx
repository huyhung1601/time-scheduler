import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ITask } from "../../../features/tasks/tasksSlice";
import Tasktable from "../tasktable/Tasktable";
import useStyle from "./styles";

interface IProps {
  editTask: (task: ITask) => void;
}

export const TaskScheduler = (props: IProps) => {
  const { editTask } = props;
  /**MUI style */
  const classes = useStyle();
  /**Redux */
  const { calendar, categories, tasks } = useSelector(
    (state: RootState) => state
  );
  const today = new Date().toLocaleDateString("en-gb");
  const todayHour = new Date().getHours();
  const timemarks = [0, 6, 12, 18];
  return (
    <div className={classes.taskSchedulerContainer}>
      <div className={classes.taskSchedulerTimeline}>
        {calendar.type === "week" && (
          <div className="timeline week">
            {calendar.dates.map((d: string, i: number) => {
              return (
                <div key={i} className={`timemark`}>
                  <div className={`date ${today === d && "today"}`}>{d}</div>
                  <div className="hours">
                    {timemarks.map((x: number, i: number) => {
                      return (
                        <small
                          key={i}
                          className={`hour ${
                            today === d &&
                            todayHour >= x &&
                            todayHour < x + 6 &&
                            "today"
                          }`}
                        >{`${x}:00`}</small>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {calendar.type === "month" && (
          <div className="timeline month">
            <div className="monthTop">
              {calendar.selectedDate.toLocaleString("en-GB", {
                year: "numeric",
                month: "long",
              })}
            </div>
            <div className="dates">
              {calendar.dates.map((d: string, i: number) => {
                return (
                  <div className={`date ${today === d && "today"}`}>
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <Tasktable
        editTask={editTask}
        tasks={tasks.tasks}
        categories={categories.categories}
      />
    </div>
  );
};
