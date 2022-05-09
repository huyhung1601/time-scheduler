import React from "react";
import { Paper, Table, TableContainer } from "@material-ui/core";
import TimetableHeader from "../timetableHeader/TimetableHeader";
import TimetableBody from "../timetableBody/TimetableBody";

const TimeTable = () => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TimetableHeader />
          <TimetableBody />
        </Table>
      </TableContainer>
    </>
  );
};

export default TimeTable;
