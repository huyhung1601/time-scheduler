import React from "react";
import clsx from "clsx";
import { Draggable } from "react-beautiful-dnd";
import useStyle from "./styles";
import { useSelector } from "react-redux";
import MenuLogo from "../../controls/menu/menuLogo/MenuLogo";
import { RootState } from "../../../app/store";
const Task = (props: any) => {
  const { t, index, openTaskDialog } = props;
  const { categories } = useSelector((state: RootState) => state);
  /**MUI style */
  const classes = useStyle();
  const { task, prev, next } = classes;
  const prevTime = (date: string) => {
    const tday = new Date().getTime();
    const time =
      new Date(date).getTime() +
      (new Date().getHours() * 3600 +
        new Date().getMinutes() * 60 +
        new Date().getSeconds()) *
        1000;
    return (time - tday) / (1000 * 24 * 3600);
  };
  const nextTime = (date: string) => {
    const tday = new Date().getTime();
    const time =
      new Date(date).getTime() -
      (new Date(date).getHours() * 3600 +
        new Date(date).getMinutes() * 60 +
        new Date(date).getSeconds()) *
        1000;
    return (time - tday) / (1000 * 24 * 3600);
  };

  const logo = categories.categories.filter(
    (x: any) => x.id === t.categoryId
  )[0].logo;

  return (
    <Draggable key={t.id} index={index} draggableId={t.id}>
      {(provided) => {
        return (
          <div
            className={clsx(
              task,
              { [prev]: prevTime(t.start) <= 0 },
              { [next]: nextTime(t.start) >= 0 }
            )}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            onClick={() => openTaskDialog(t)}
          >
            <MenuLogo fontSize="small" logo={logo} />
            <small>{t.name}</small>
            <br />
          </div>
        );
      }}
    </Draggable>
  );
};

export default React.memo(Task);
