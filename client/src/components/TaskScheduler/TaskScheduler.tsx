import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/reducers";
import { timeMarks } from "../../utils";
import TaskTable from "../taskTable/TaskTable";
import useStyle from "./styles";
const TaskScheduler = () => {
  /**MUI style */
  const classes = useStyle();
  /**Redux */
  const { calendar } = useSelector((state: State) => state);
  const today = new Date().toLocaleDateString("en-gb");
  const todayHour = new Date().getHours()
  const timemarks = [0,6,12,18]
  return (
    <div className={classes.taskSchedulerContainer}>
      {calendar.type === "week" && (
        <div className="timeline week">
          {calendar.dates.map((d: string, i: number) => {
            return (
              <div key={i} className={`timemark`}>
                <div className={`date ${today == d && "today"}`}>{d}</div>
                <div className="hours">
                  {timemarks.map((x:number,i:number)=>{
                    return(
                      <small key={i} className={`hour ${today == d && todayHour>=x &&todayHour<x +6 && "today"}`}>{`${x}:00`}</small>
                    )
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {calendar.type === "month" && <div className="timeline month">
        <div className="monthTop">{calendar.selectedDate.toLocaleString("en-GB", {
              year: "numeric",
              month: "long",
            })}</div>
        <div className="dates">
        {calendar.dates.map((d: string, i: string)=>{
            return(
              <div className={`date ${today == d && "today"}`}>
                {i+1}
              </div>
            )
          })}
        </div>
         
        </div>}
      <TaskTable />
    </div>
  );
};

export default TaskScheduler;
