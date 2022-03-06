import { TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store/reducers";

const TimetableHeader = () => {
  const {calendar} = useSelector((state: State)=>state)
  return (
    <>
    <TableHead style={{padding: '0px'}}>
      <TableRow>
        {calendar.dates?.map((date: any, index: number)=>{
          return(
            <TableCell key={index}>
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
