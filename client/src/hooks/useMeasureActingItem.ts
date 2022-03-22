import React, { useCallback, useRef,useState } from 'react'
import { toISOStringNoZ,removeTimezone } from '../utils'
const useMeasureActingItem= ({task,memorizedTimeline,itemRef}: {task: any,memorizedTimeline:any,itemRef:any}) =>{
    const [actingItem,setActingItem] = useState(task)
    let isResizing = false
    
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
            ((rect.x - 11 - (prevX - e.pageX)) / wrapWidth) * 100 + "%";
          prevX = e.pageX;
          setActingItem({
            ...task,
            start: toISOStringNoZ(removeTimezone (new Date(
              memorizedTimeline.start +
                ((memorizedTimeline.end - memorizedTimeline.start) / wrapWidth) * (rect.x - 11)
            ))),
            end: toISOStringNoZ(removeTimezone(new Date(
              memorizedTimeline.start +
                ((memorizedTimeline.end - memorizedTimeline.start) / wrapWidth) *
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
          itemRef.current.style.width =((rect.width - (prevX - e.pageX)) / wrapWidth) * 100 > 1 &&
            ((rect.width - (prevX - e.pageX)) / wrapWidth) * 100 + "%";
            setActingItem({
            ...actingItem,
            end: toISOStringNoZ(removeTimezone( new Date(
              memorizedTimeline.start +
                ((memorizedTimeline.end - memorizedTimeline.start) / wrapWidth) *
                  (rect.left + rect.width - 11)
            ))),
          });
        } else {
          itemRef.current.style.left =
            ((rect.x - 11 - (prevX - e.pageX)) / wrapWidth) * 100 + "%";

          itemRef.current.style.width = ((rect.width + (prevX - e.pageX)) / wrapWidth) * 100 >1 &&
            ((rect.width + (prevX - e.pageX)) / wrapWidth) * 100 + "%";
            setActingItem({
            ...task,
            start: toISOStringNoZ(removeTimezone(new Date(
              memorizedTimeline.start +
                ((memorizedTimeline.end - memorizedTimeline.start) / wrapWidth) * (rect.x - 11)
            ))),
            end: toISOStringNoZ(removeTimezone(new Date(
              memorizedTimeline.start +
                ((memorizedTimeline.end - memorizedTimeline.start) / wrapWidth) *
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
    return[onMove,onResize,actingItem]
}

export default useMeasureActingItem
