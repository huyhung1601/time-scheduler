import { useRef, useState, useEffect } from "react";
import { toISOStringNoZ, deductTimezoneOffset } from "../utils";

interface IProps {
  task: any;
  timeline: any;
  itemX: number;
  itemWidth: number;
  type: string;
}
const useMeasureActingItem = ({
  task,
  timeline,
  itemX,
  itemWidth,
  type,
}: IProps) => {
  const [actingItem, setActingItem] = useState(task);
  const itemRef = useRef<any>();
  let isResizing = false;

  useEffect(() => {
    itemRef.current &&
      (itemRef.current.style.left = itemX + "%") &&
      (itemRef.current.style.width = itemWidth + "%");
    setActingItem(task);
  }, [task, type, itemX, itemWidth, setActingItem]);
  // /**Hangle move */
  const onMove = (e: any) => {
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
            ((rect.x - 10 - (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          prevX = e.pageX;
          setActingItem({
            ...task,
            start: toISOStringNoZ(
              deductTimezoneOffset(
                new Date(
                  timeline.start +
                    ((timeline.end - timeline.start) / wrapWidth) *
                      (rect.x - 10)
                )
              )
            ),
            end: toISOStringNoZ(
              deductTimezoneOffset(
                new Date(
                  timeline.start +
                    ((timeline.end - timeline.start) / wrapWidth) *
                      (rect.x + rect.width - 10)
                )
              )
            ),
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
  const onResize = (e: any) => {
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
            ((rect.width - (prevX - e.pageX)) / wrapWidth) * 100 > 1 &&
            ((rect.width - (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          setActingItem({
            ...actingItem,
            end: toISOStringNoZ(
              deductTimezoneOffset(
                new Date(
                  timeline.start +
                    ((timeline.end - timeline.start) / wrapWidth) *
                      (rect.left + rect.width - 10)
                )
              )
            ),
          });
        } else {
          itemRef.current.style.left =
            ((rect.x - 10 - (prevX - e.pageX)) / wrapWidth) * 100 + "%";

          itemRef.current.style.width =
            ((rect.width + (prevX - e.pageX)) / wrapWidth) * 100 > 1 &&
            ((rect.width + (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          setActingItem({
            ...task,
            start: toISOStringNoZ(
              deductTimezoneOffset(
                new Date(
                  timeline.start +
                    ((timeline.end - timeline.start) / wrapWidth) *
                      (rect.x - 10)
                )
              )
            ),
            end: toISOStringNoZ(
              deductTimezoneOffset(
                new Date(
                  timeline.start +
                    ((timeline.end - timeline.start) / wrapWidth) *
                      (rect.x + rect.width - 10)
                )
              )
            ),
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
  return [onMove, onResize, actingItem, itemRef];
};

export default useMeasureActingItem;
