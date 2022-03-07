import React from "react";
import { Draggable } from "react-beautiful-dnd";
const Task = (props: any) => {
    const {t,index} = props
  return (
    <Draggable key={t.id} index={index} draggableId={t.id}>
      {(provided) => {
        return (
          <div
            className="draggable"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <small>{t.start.toLocaleString("en-GB")}</small>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
