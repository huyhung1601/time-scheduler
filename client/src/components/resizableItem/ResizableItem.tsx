import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { State } from "../../store/reducers";
import useStyle from "./styles";
const ResizableItem: React.FC<any> = ({ task }) => {
  const itemRef = useRef<any>(null);
  let isResizing = false;
  const [movingTask, setMovingTask] = useState(task);
  /**MUI style */
  const classes = useStyle();
  /**Redux */
  const dispatch = useDispatch();
  const { calendar } = useSelector((state: State) => state);
  const { timeline, type, by } = calendar;
  const { updateTask } = bindActionCreators(actionCreators, dispatch);
  //Item Style
  const startTime = new Date(task.start).getTime();
  const endTime = new Date(task.end).getTime();
  const itemX =
    (100 * (startTime - timeline.start)) / (timeline.end - timeline.start);
  const itemWidth =
    (100 * (endTime - startTime)) / (timeline.end - timeline.start);
  useEffect(() => {
    itemRef.current &&
      (itemRef.current.style.left = itemX + "%") &&
      (itemRef.current.style.width = itemWidth + "%");
  }, [task, by, type]);
  /**Update Task */
  useEffect(() => {
    updateTask(movingTask);
  }, [movingTask]);
  /**Hangle move */
  const onMove = (e: any): void => {
    let prevX = e.pageX;
    let wrapWidth = 0;
    //Mouse move
    const mouseMove = (e: any): void => {
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        wrapWidth =
          (rect.width * 100) /
          Number(itemRef.current.style.width.replace("%", ""));
        //Moving
        if (!isResizing) {
          itemRef.current.style.left =
            rect.left - 10 - (prevX - e.pageX) + "px";
          prevX = e.pageX;
          setMovingTask({
            ...task,
            start: new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) * (rect.x - 10)
            ).toISOString(),
            end: new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) *
                  (rect.x + rect.width - 10)
            ).toISOString(),
          });
        }
      }
    };

    //Mouse up
    const mouseUp = (e: any): void => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
    //Add events
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };
  /**Hanlde Resise */
  const onResize = (e: any): void => {
    let prevX = e.pageX;
    let wrapWidth = 0;
    isResizing = true;
    const currentResize = e.target;
    const mouseMove = (e: any) => {
      if (itemRef.current && isResizing) {
        const rect = itemRef.current.getBoundingClientRect();
        wrapWidth =
          (rect.width * 100) /
          Number(itemRef.current.style.width.replace("%", ""));
        if (currentResize.classList.contains("right")) {
          itemRef.current.style.width =
            ((rect.width - (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          setMovingTask({
            ...movingTask,
            end: new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) *
                  (rect.left + rect.width - 10)
            ).toISOString(),
          });
        } else {
          itemRef.current.style.left =
            rect.left - 10 - (prevX - e.pageX) + "px";
          itemRef.current.style.width =
            ((rect.width + (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          setMovingTask({
            ...task,
            start: new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) * (rect.x - 10)
            ).toISOString(),
            end: new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) *
                  (rect.x + rect.width - 10)
            ).toISOString(),
          });
        }
        prevX = e.pageX;
      }
    };

    /**Mouse up*/
    const mouseUp = (e: any): void => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      isResizing = false;
    };
    //Add events
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  return (
    <div className={classes.itemContainer}>
<div className={classes.itemInfos}>
          <small className="itemInfo">{task.task}</small>
          <small className="itemInfo">
            Start:
            {new Date(movingTask.start).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
          <small className="itemInfo">
            End: 
            {new Date(movingTask.end).toLocaleString("en-GB", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </div>
      <div ref={itemRef} onMouseDown={onMove} className={classes.resizableItem}>       
        <div className="timebar">
          <div onMouseDown={onResize} className="resizer left"></div>
          <div onMouseDown={onResize} className="resizer right"></div>
        </div>
      </div>
    </div>
  );
};

export default ResizableItem;
