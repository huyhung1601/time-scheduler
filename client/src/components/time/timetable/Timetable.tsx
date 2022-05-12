import { Paper, Table, TableContainer } from "@material-ui/core";
import TimetableHeader from "../timetableHeader/TimetableHeader";
import TimetableBody from "../timetableBody/TimetableBody";
import { ITask } from "../../../features/tasks/tasksSlice";

interface IProps {
  editTask: (task: ITask) => void;
}
const TimeTable = (props: IProps) => {
  const { editTask } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TimetableHeader />
          <TimetableBody editTask={editTask} />
        </Table>
      </TableContainer>
    </>
  );
};

export default TimeTable;
