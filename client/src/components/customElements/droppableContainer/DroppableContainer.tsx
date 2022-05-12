import React from "react";
import { Droppable } from "react-beautiful-dnd";
import useStyles from "./styles";

interface IProps {
  droppableId: string;
  children: (JSX.Element[] | JSX.Element) & React.ReactNode;
}
export const DroppableContainer: React.FC<IProps> = (props) => {
  const { droppableId, children } = props;
  const classes = useStyles();
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => {
        return (
          <div
            className={classes.root}
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
