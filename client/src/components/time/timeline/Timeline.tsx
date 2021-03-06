import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { RootState } from "../../../app/store";

const Timeline = () => {
  /**MUI Style */
  const classes = useStyles();
  const timemarks = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ];
  /**Redux */
  const calendar = useSelector((state: RootState) => state.calendar);
  const { start, end } = calendar.timeline;
  return (
    <TableContainer className={classes.root}>
      <Table aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          {timemarks.map((x: number, i: number) => {
            if (x >= start && x <= (calendar.type === "week" ? end : end - 1)) {
              return (
                <TableRow className={classes.tableRow} key={i}>
                  {calendar.type === "month" ? `W${x}` : `${x}:00`}
                </TableRow>
              );
            } else {
              return null;
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Timeline;
