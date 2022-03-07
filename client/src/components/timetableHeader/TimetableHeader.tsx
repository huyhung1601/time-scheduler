import { TableCell, TableHead, TableRow } from "@material-ui/core";
import clsx from 'clsx'
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/reducers";
import useStyles from './styles'
const TimetableHeader = () => {
  const sameDate = (date: any) =>{
    let tday = (new Date()).toLocaleDateString('en-gb')
    return tday === date
  }
  /**MUI Styles */
  const classes = useStyles()
  const {tableCell,today} = classes
  /**Redux */
  const {calendar} = useSelector((state: State)=>state)
  /**days */
  const day = (index: number) =>{
    let day
    switch (index) {
      case 0:
        day = "Sun";
        break;
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tue";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thu";
        break;
      case 5:
        day = "Fri";
        break;
      case  6:
        day = "Sat";
    }
    return day
  }
  return (
    <>
    <TableHead >
      <TableRow >
        {calendar.dates.map((date: any, index: number)=>{
          return(
            <TableCell className={clsx(tableCell,{[today]: sameDate(date)})} key={index}>
              <small>{day(index)}<br/>{date}</small>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
    </>
  );
};

export default TimetableHeader;
