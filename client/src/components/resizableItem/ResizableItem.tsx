import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useStyle from "./styles";
import useMeasureActingItem from "../../hooks/useMeasureActingItem";
const ResizableItem: React.FC<any> = (props) => {
  const { task, openTaskDialog, handleUpdateTask, timeline,type } = props;
  /**MUI style */
  const classes = useStyle();
  //Item Style
  const todayTime = new Date().getTime();
  const startTime = new Date(task.start).getTime();
  const endTime = new Date(task.end).getTime();
  const linearGradient =
    ((todayTime - startTime) / (endTime - startTime)) * 100;
  const itemX =
    (100 * (startTime - timeline.start)) /
    (timeline.end - timeline.start);
  const itemWidth =
    (100 * (endTime - startTime)) /
    (timeline.end - timeline.start);
  /**Measure Acting Item */
  const [onMove, onResize, actingItem, itemRef] = useMeasureActingItem({
    task,type,
    timeline,itemX,itemWidth,
  });

  /**Update Task */
  useDebounce(() => handleUpdateTask(actingItem), 1000, [actingItem]);
  return (
    <div className={classes.itemContainer}>
      <div
        onClick={() => openTaskDialog(actingItem)}
        className={classes.itemInfos}
      >
        <small className="itemInfo">{task.name}</small>
        <small className="itemInfo">
          Start:
          {new Date(actingItem.start).toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>
        <small className="itemInfo">
          End:
          {new Date(actingItem.end).toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>
      </div>
      <div ref={itemRef} onMouseDown={onMove} className={classes.resizableItem}>
        <div
          className="timebar"
          style={{
            background:
              todayTime > endTime
                ? "lightgray"
                : todayTime < startTime
                ? "lightblue"
                : `linear-gradient(to right, lightgray 0%,lightgray ${linearGradient}%,#57aecb ${linearGradient}%,#57aecb 100%)`,
          }}
        >
          <div onMouseDown={onResize} className="resizer left"></div>
          <div onMouseDown={onResize} className="resizer right"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ResizableItem);
