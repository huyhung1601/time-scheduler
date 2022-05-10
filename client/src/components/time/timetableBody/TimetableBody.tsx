import { TableBody, TableCell, TableRow } from "@material-ui/core";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import useStyles from "./styles";
import { useTaskDialogContext } from "../../../context/TaskDialogContext";
import { converToNum, daysCurrentMonth } from "../../../utils";
import { useCallback, useEffect } from "react";
import {
  dropToChangeDate,
  ITask,
  updateTask,
} from "../../../features/tasks/tasksSlice";
import { RootState } from "../../../app/store";
import { DroppableContainer } from "../../controls";
import DraggableTaskItem from "../draggableTaskItem/DraggableTaskItem";

const TimetableBody = () => {
  /**MUI styles */
  const classes = useStyles();
  const { month, week, empty } = classes;
  /**Redux */
  const dispatch = useDispatch();
  const { calendar, tasks } = useSelector((state: RootState) => state);
  const { type, body } = calendar;
  const { start, end } = calendar.timeline;
  //Handle Drag
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    //Drop Item
    dispatch(dropToChangeDate({ result, calendar }));
  };

  useEffect(() => {
    tasks.droppedTask && dispatch(updateTask(tasks.droppedTask));
  }, [tasks.droppedTask, dispatch]);

  /**open TaskDialog */
  const { editTask } = useTaskDialogContext();
  const openTaskDialog = useCallback(
    (t) => {
      editTask?.(t);
    },
    [editTask]
  );
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TableBody className={classes.root}>
          {body.map((row: any, index: number) => {
            if (
              (type === "week" && index >= start * 2 && index <= end * 2 + 1) ||
              (type === "month" && index >= start && index <= end + 1)
            ) {
              return (
                <TableRow key={index}>
                  {row.map((slot: any, index: number) => {
                    const id = converToNum(slot.id)[0];
                    if (
                      type === "month" &&
                      (id < 1 || id > daysCurrentMonth(calendar.selectedDate))
                    ) {
                      return (
                        <TableCell className={month}>
                          <div className={empty}>N/A</div>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell
                        key={index}
                        className={clsx(
                          { [month]: type === "month" },
                          { [week]: type === "week" }
                        )}
                      >
                        <DroppableContainer droppableId={slot.id}>
                          <div className={classes.taskContainer}>
                            <div className="containerHeader">
                              {type === "month" && (
                                <small className="date">{id}</small>
                              )}
                            </div>
                            <div className="containerBody">
                              {slot.tasks.map((t: ITask, index: number) => {
                                return (
                                  <DraggableTaskItem
                                    openTaskDialog={openTaskDialog}
                                    task={t}
                                    key={index}
                                    index={index}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </DroppableContainer>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            } else {
              return null;
            }
          })}
        </TableBody>
      </DragDropContext>
    </>
  );
};

export default TimetableBody;
