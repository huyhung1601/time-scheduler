import React from "react";
import { Draggable } from "react-beautiful-dnd";
import useStyles from "./styles";

interface IProps {
  index: number;
  draggableId: string;
  children: (JSX.Element[] | JSX.Element) & React.ReactNode;
  isDragging?: () => void;
  isDragged?: () => void;
}

export const DraggableContainer = (props: IProps) => {
  const { index, draggableId, children, isDragging, isDragged } = props;
  const classes = useStyles();
  return (
    <Draggable index={index} draggableId={draggableId}>
      {(provided, snapshot) => {
        return (
          <div
            className={classes.root}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            {...(snapshot.isDragging ? isDragging : isDragged)}
          >
            {children}
          </div>
        );
      }}
    </Draggable>
  );
};
