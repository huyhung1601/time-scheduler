import {  Grid,} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import Timeline from "../timeline/Timeline";
import Timetable from "../timetable/Timetable"
import "./styles.css";


const TimeScheduler: React.FC = () => {
  
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <Timeline />
        </Grid>
        <Grid item xs={11}container >
          <Timetable />
        </Grid>
      </Grid>
    </div>
  );
};

export default TimeScheduler;
