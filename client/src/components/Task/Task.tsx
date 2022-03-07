import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useStyle from './styles'
const Task = (props: any) => {
    const {t,index} = props
    /**MUI style */
    const classes = useStyle()
  return (
    <Draggable key={t.id} index={index} draggableId={t.id}>
      {(provided) => {
        return (
          <div
            className={classes.task}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <small className={classes.text}>{t.task}</small>
            <br/>
            <small className={classes.text}>{t.start.toLocaleString("en-GB")}</small>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
