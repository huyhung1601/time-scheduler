import React from "react";
import clsx from 'clsx'
import { Draggable } from "react-beautiful-dnd";
import useStyle from './styles'
const Task = (props: any) => {
    const {t,index} = props
    /**MUI style */
    const classes = useStyle()
    const {task, prev, next} = classes
    const prevTime =(date: string) =>{
      const tday = new Date().getTime()      
      const time = new Date(date).getTime()
      return (time - tday)/(1000*24*3600)
    }
    const nextTime = (date: string) =>{
      const tday = new Date().getTime()
      const time = new Date(date).getTime() - (new Date(date).getHours()*3600 + new Date(date).getMinutes()*60 + new Date(date).getSeconds())*1000
      return (time - tday)/(1000*24*3600)

    }
  return (
    <Draggable key={t.id} index={index} draggableId={t.id}>
      {(provided) => {
        return (
          <div
            className={clsx(task,{[prev]:prevTime(t.start) <= 0},{[next]:nextTime(t.start) >=0 } )}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <small>{t.task}</small>
            <br/>
            <small>{t.start.toLocaleString("en-GB")}</small>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
