import React, { JSXElementConstructor } from "react";
import { Droppable } from "react-beautiful-dnd";

interface IProps {
  droppableId: any;
  children: (JSX.Element[] | JSX.Element) & React.ReactNode;
}
const DroppableContainer: React.FC<IProps> = (props) => {
  const { droppableId, children } = props;
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => {
        return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            </div>
        );
      }}
    </Droppable>
  );
};

export default DroppableContainer;