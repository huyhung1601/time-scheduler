import React from "react";
import clsx from "clsx";
import useStyle from "./styles";
import { useSelector } from "react-redux";
import { CustomLogo, DraggableContainer } from "../../customElements";
import { RootState } from "../../../app/store";

const DraggableTaskItem = (props: any) => {
  const { task, index, editTask } = props;
  const { categories } = useSelector((state: RootState) => state);
  /**MUI style */
  const classes = useStyle();
  const { taskItem, prev, next } = classes;
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
    (x: any) => x.id === task.categoryId
  )[0].logo;

  return (
    <DraggableContainer index={index} draggableId={task.id}>
      <div
        className={clsx(
          taskItem,
          { [prev]: prevTime(task.start) <= 0 },
          { [next]: nextTime(task.start) >= 0 }
        )}
        onClick={() => editTask(task)}
      >
        <CustomLogo fontSize="small" logo={logo} />
        <small>{task.name}</small>
        <br />
      </div>
    </DraggableContainer>
  );
};

export default React.memo(DraggableTaskItem);
