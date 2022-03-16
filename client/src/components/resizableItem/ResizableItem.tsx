import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import React, { useEffect, useRef, useState, MouseEvent, Ref } from "react";
import useStyle from "./styles";
const ResizableItem = () => {
  const itemRef = useRef<any>(null);
  const classes = useStyle();
  let isResizing = false
  //Item Width
  useEffect(() => {}, []);
  /**Mouse events */
  const onMove = (e: any): void => {
    let prevX = e.pageX;
    //Mouse move
    const mouseMove = (e: any): void => {
      if (!isResizing){
        if (itemRef.current) {
          const rect = itemRef.current.getBoundingClientRect();
          //Moving
          if (!isResizing){
            itemRef.current.style.left = rect.left - prevX - e.pageX + "px";
          prevX = e.pageX;
          }          
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
    let prevX = e.pageX
    isResizing = true
    const currentResize = e.target
    const mouseMove = (e:any)=>{
      if (itemRef.current && isResizing) {
        const rect = itemRef.current.getBoundingClientRect();        
        if(currentResize.classList.contains("right")){
          itemRef.current.style.width = rect.width - (prevX - e.pageX) + 'px'
        } else {
          itemRef.current.style.width = rect.width + (prevX - e.pageX) + 'px'      
          itemRef.current.style.left = rect.left - (prevX - e.pageX) + 'px'

        }
          prevX = e.pageX;

      }
    }
    
    /**Mouse up*/
    const mouseUp = (e: any): void => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup",mouseUp);
      isResizing = false
    };
    //Add events
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  return (
    <div className={classes.root}>
      <div ref={itemRef} onMouseDown={onMove} className={classes.resizableItem}>
        <div
          onMouseDown={onResize}
          className="resizer left"
        ></div>
        <div
          onMouseDown={onResize}
          className="resizer right"
        ></div>
      </div>
    </div>
  );
};

export default ResizableItem;
