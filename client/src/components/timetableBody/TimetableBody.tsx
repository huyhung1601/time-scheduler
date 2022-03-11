import React, { useEffect } from "react";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import { State } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import {
  DragDropContext,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import Task from "../task/Task";
import useStyles from './styles'
import TaskDialog from "../taskDialog/TaskDialog";
import { TaskProps } from "../../store/actions";
import { converToNum } from "../../utils";
const TimetableBody = () => {
  /**MUI styles */
  const classes = useStyles()
  /**Redux */
  const dispatch = useDispatch()
  const {dropItem,updateTask} = bindActionCreators(actionCreators,dispatch)
  const {calendar,tasks} = useSelector((state: State)=>state)
  //Handle Drag
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
      if (!destination) {
        console.log(destination)
        return;
      }
      if(destination.index === source.index && destination.droppableId === source.droppableId){
        console.log(result)
        return
    }
    //Drop Item        
    dropItem(result,calendar.dates) 
    const indexs= converToNum(destination.droppableId) 
    const droppedItem = tasks[indexs[0]][indexs[1]].tasks[destination.index]
    const modifiedTask = {...droppedItem, start: droppedItem.start.toISOString(),end: droppedItem.end.toISOString()}
    updateTask(modifiedTask)
  };


  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TableBody className={classes.root} >
          {tasks.map((row: any, index: number) => {
            if (index >= calendar.timeline.start*2 && index <= calendar.timeline.end*2 + 1) {
            return (
              <TableRow  key={index}>
                {row.map((slot: any, index: number) => {
                  return (
                    <Droppable droppableId={slot.id} key={index}>
                      {(provided) => {
                        return (
                          <TableCell
                            className={classes.tableCell}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <div className={classes.taskContainer}>
                          {slot.tasks.map((t:any, index: number)=>{
                            return(
                              <Task t={t} key={index} index={index}/>
                            )
                          })}
                          </div>
                          </TableCell>
                        );
                      }}
                    </Droppable>                    
                  );
                })}
              </TableRow>
            )} else{ return null}
          })}
          <TaskDialog/>
        </TableBody>
        
      </DragDropContext>
    </>
  );
};

export default TimetableBody;
