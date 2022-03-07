import React from "react";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import { State } from "../../store/reducers";
import { useDispatch, useSelector } from "react-redux";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import Task from "../Task/Task";
import useStyles from './styles'
const TimetableBody = () => {
  /**MUI styles */
  const classes = useStyles()
  /**Redux */
  const dispatch = useDispatch()
  const {dragItem} = bindActionCreators(actionCreators,dispatch)
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
    dragItem(result,calendar.dates)
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
        </TableBody>
      </DragDropContext>
    </>
  );
};

export default TimetableBody;
