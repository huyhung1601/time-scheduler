import { TableBody, TableCell, TableRow } from "@material-ui/core";
import clsx from "clsx";
import { State } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import Task from "../task/Task";
import useStyles from "./styles";
import TaskDialog from "../taskDialog/TaskDialog";
import { converToNum, daysCurrentMonth, daysCurrentMonth1 } from "../../utils";
import { TaskProps } from "../../store/actions";
import { useEffect, useState } from "react";
const TimetableBody = () => {
  /**MUI styles */
  const classes = useStyles();
  const { month, week, empty } = classes;
  /**Redux */
  const dispatch = useDispatch();
  const { dropItem, updateTask } = bindActionCreators(actionCreators, dispatch);
  const { calendar, tasks } = useSelector((state: State) => state);
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
    dropItem(result, calendar);
  };
  useEffect(()=>{
    tasks.modifiedTask  && updateTask(tasks.modifiedTask)
  },[tasks.modifiedTask])

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TableBody className={classes.root}>
          {body.map((row: any, index: number) => {
            if (
              (type == "week" && index >= start * 2 && index <= end * 2 + 1) ||
              (type == "month" && index >= start && index <=end +1)
            ) {
              return (
                <TableRow key={index}>
                  {row.map((slot: any, index: number) => {
                    const id = converToNum(slot.id)[0];
                    if (
                      type === "month" &&
                      (id < 1 || id > daysCurrentMonth1(calendar.selectedDate))
                    ) {
                      return (
                        <TableCell className={month}>
                          <div className={empty}>N/A</div>
                        </TableCell>
                      );
                    }
                    return (
                      <Droppable droppableId={slot.id} key={index}>
                        {(provided) => {
                          return (
                            <TableCell
                              className={clsx(
                                { [month]: type === "month" },
                                { [week]: type === "week" }
                              )}
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              <div className={classes.taskContainer}>
                                <div className="containerHeader">
                                  {type === "month" && <small>{id}</small>}
                                </div>
                                <div className="containerBody">
                                  {slot.tasks.map((t: TaskProps, index: number) => {
                                    return (
                                      <Task t={t} key={index} index={index} />
                                    );
                                  })}
                                </div>
                              </div>
                            </TableCell>
                          );
                        }}
                      </Droppable>
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
