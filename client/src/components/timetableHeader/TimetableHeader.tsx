import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";

const TimetableHeader = () => {
  return (
    <>
    <TableHead style={{padding: '0px'}}>
      <TableRow>
        <TableCell  align="center">Sun</TableCell>
        <TableCell  align="center">Mon</TableCell>
        <TableCell  align="center">Tue</TableCell>
        <TableCell  align="center">Wed</TableCell>
        <TableCell  align="center">Thu</TableCell>
        <TableCell  align="center">Fri</TableCell>
        <TableCell  align="center">Sat</TableCell>
      </TableRow>
    </TableHead>
    </>
  );
};

export default TimetableHeader;
