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
const TimetableBody = () => {
  const tasks = useSelector((state: State) => state.tasks);
  const dispatch = useDispatch()
  const {dragItem} = bindActionCreators(actionCreators,dispatch)

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
    dragItem(result)
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TableBody>
          {tasks.map((row: any, index: number) => {
            return (
              <TableRow>
                {row.map((slot: any, index: number) => {
                  return (
                    <Droppable droppableId={slot.id}>
                      {(provided) => {
                        return (
                          <TableCell
                            className="timeslot"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                          {slot.tasks.map((t:any, index: number)=>{
                            return(
                              <Draggable key={t.id} index={index} draggableId={t.id}>
                                {(provided)=>{
                                  return(
                                    <div className="draggable" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                        {t.task}
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
                          </TableCell>
                        );
                      }}
                    </Droppable>                    
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </DragDropContext>
    </>
  );
};

export default TimetableBody;
