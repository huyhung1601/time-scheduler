import { TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/reducers";
import useStyles from './styles'
const TimetableHeader = () => {
  /**MUI Styles */
  const classes = useStyles()
  /**Redux */
  const {calendar} = useSelector((state: State)=>state)
  return (
    <>
    <TableHead >
      <TableRow >
        {calendar.dates.map((date: any, index: number)=>{
          return(
            <TableCell className={classes.tableCell} key={index}>
              <small>{date}</small>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
    </>
  );
};

export default TimetableHeader;
