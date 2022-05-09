import React from "react";
import { Droppable } from "react-beautiful-dnd";

interface IProps {
  droppableId: string;
  children: (JSX.Element[] | JSX.Element) & React.ReactNode;
}
export const DroppableContainer: React.FC<IProps> = (props) => {
  const { droppableId, children } = props;
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => {
        return (
          <div
            style={{ width: "100%" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {children}
          </div>
        );
      }}
    </Droppable>
  );
};
