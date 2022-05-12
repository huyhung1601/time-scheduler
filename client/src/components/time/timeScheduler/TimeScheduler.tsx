import { Grid } from "@material-ui/core";
import { ICalendar } from "../../../features/calendar/calendarSlice";
import { ITask } from "../../../features/tasks/tasksSlice";
import Timeline from "../timeline/Timeline";
import Timetable from "../timetable/Timetable";
import "./styles.css";

interface IProps {
  calendar: ICalendar;
  editTask: (task: ITask) => void;
}
export const TimeScheduler = (props: IProps) => {
  const { editTask } = props;
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <Timeline />
        </Grid>
        <Grid item xs={11} container>
          <Timetable editTask={editTask} />
        </Grid>
      </Grid>
    </div>
  );
};
