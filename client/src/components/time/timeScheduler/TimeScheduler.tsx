import { Grid } from "@material-ui/core";
import { ICalendar } from "../../../features/calendar/calendarSlice";
import Timeline from "../timeline/Timeline";
import Timetable from "../timetable/Timetable";
import "./styles.css";

interface IProps {
  calendar: ICalendar;
}
export const TimeScheduler = (props: IProps) => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <Timeline />
        </Grid>
        <Grid item xs={11} container>
          <Timetable />
        </Grid>
      </Grid>
    </div>
  );
};
