import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useTaskDialogContext } from "../../context/TaskDialogContext";
import useDebounce from "../../hooks/useDebounce";
import { actionCreators } from "../../store";
import { State } from "../../store/reducers";
import { removeTimezone, toISOStringNoZ } from "../../utils";
import useStyle from "./styles";
const ResizableItem: React.FC<any> = ({ task }) => {
  const itemRef = useRef<any>(null);
  let isResizing = false;
  const [movingTask, setMovingTask] = useState(task);
  /**MUI style */
  const classes = useStyle();
  /**Redux & context */
  
  const dispatch = useDispatch();
  const { calendar } = useSelector((state: State) => state);
  const { timeline, type, by } = calendar;
  const { updateTask } = bindActionCreators(actionCreators, dispatch);
  const { editTask } = useTaskDialogContext();
  //Item Style
  const todayTime = new Date().getTime();
  const startTime = new Date(movingTask.start).getTime();
  const endTime = new Date(movingTask.end).getTime();
  const linearGradient =
    ((todayTime - startTime) / (endTime - startTime)) * 100;

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
  useDebounce(()=>updateTask(movingTask),1000,[movingTask])
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
            ((rect.x - 11 - (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          prevX = e.pageX;
          setMovingTask({
            ...task,
            start: toISOStringNoZ(removeTimezone (new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) * (rect.x - 11)
            ))),
            end: toISOStringNoZ(removeTimezone(new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) *
                  (rect.x + rect.width - 11)
            ))),
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
          itemRef.current.style.width =((rect.width - (prevX - e.pageX)) / wrapWidth) * 100 > 1 &&
            ((rect.width - (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          setMovingTask({
            ...movingTask,
            end: toISOStringNoZ(removeTimezone( new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) *
                  (rect.left + rect.width - 11)
            ))),
          });
        } else {
          itemRef.current.style.left =
            ((rect.x - 11 - (prevX - e.pageX)) / wrapWidth) * 100 + "%";

          itemRef.current.style.width = ((rect.width + (prevX - e.pageX)) / wrapWidth) * 100 >1 &&
            ((rect.width + (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          setMovingTask({
            ...task,
            start: toISOStringNoZ(removeTimezone(new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) * (rect.x - 11)
            ))),
            end: toISOStringNoZ(removeTimezone(new Date(
              timeline.start +
                ((timeline.end - timeline.start) / wrapWidth) *
                  (rect.x + rect.width - 11)
            ))),
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
  /**Edit Task */
  const openTaskEdit = () => {
    editTask && editTask(movingTask);
  };
  return (
    <div className={classes.itemContainer}>
      <div onClick={openTaskEdit} className={classes.itemInfos}>
        <small className="itemInfo">{task.name}</small>
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
