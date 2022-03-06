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
  const {dates} = useSelector((state: State)=>state)
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
    dragItem(result,dates)
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TableBody>
          {tasks.map((row: any, index: number) => {
            return (
              <TableRow key={index}>
                {row.map((slot: any, index: number) => {
                  return (
                    <Droppable droppableId={slot.id} key={index}>
                      {(provided) => {
                        return (
                          <TableCell
                            className="timeslot"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            onClick={()=>console.log(slot)}
                          >
                          {slot.tasks.map((t:any, index: number)=>{
                            return(
                              <Draggable key={t.id} index={index} draggableId={t.id}>
                                {(provided)=>{
                                  return(
                                    <div className="draggable" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                        <small>{t.start.toLocaleString('en-GB')}</small>
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
