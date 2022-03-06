import {  Grid,} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { State } from "../../store/reducers";
import Timeline from "../timeline/Timeline";
import Timetable from "../timetable/Timetable"
import {v4} from 'uuid'
import "./styles.css";
const fakeData = [
  { id:v4(), task: "task 1", start: "03/01/2022 1:31", end: "03/03/2022 10:15" },
  { id:v4(), task: "task 2", start: "03/01/2022 1:35", end: "03/03/2022 10:15" },
  { id:v4(), task: "task 3", start: "03/04/2022 3:15", end: "03/04/2022 14:15" },
  { id:v4(), task: "task 4", start: "03/05/2022 2:15", end: "03/05/2022 14:15" },
  { id:v4(), task: "task 5", start: "03/06/2022 3:35", end: "03/06/2022 10:15" },
  { id:v4(), task: "task 6", start: "03/06/2022 1:15", end: "03/06/2022 11:15" },
  { id:v4(), task: "task 7", start: "03/06/2022 3:15", end: "03/06/2022 15:15" },
];

const TimeScheduler: React.FC = () => {
  const dispatch = useDispatch();
  const { getTasks } = bindActionCreators(actionCreators, dispatch);

  //**Get tasks */
  useEffect(()=>{   
    getTasks(fakeData)  
  },[])
  
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
