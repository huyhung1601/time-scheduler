import React, { useCallback, useMemo, useState } from 'react'
import ResizableItem from '../resizableItem/ResizableItem'
import {useDispatch,useSelector} from 'react-redux'
import {State} from '../../store/reducers'
import useStyle from './styles'
import { TaskProps } from '../../store/actions'
import { useTaskDialogContext } from "../../context/TaskDialogContext";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";

const TaskTable = () => {
  /**MUI style */
  const classes = useStyle()
  /**Redux */
  const dispatch = useDispatch()
  const { updateTask } = bindActionCreators(actionCreators, dispatch);

  const { tasks,calendar } = useSelector((state: State) => state);
  const memorizedTimeline = useMemo(()=>{
    return calendar.timeline
  },[calendar])
  const { editTask } = useTaskDialogContext();

  const openTaskDialog = useCallback((movingTask)=>{
    editTask && editTask(movingTask);
  },[])

  const handleUpdateTask = useCallback((movingTask)=>{
    updateTask && updateTask(movingTask)
  },[])
  return (
    <div className={classes.taskTable}>      
        {tasks.tasks.map((task: TaskProps)=>{
          return(
          <ResizableItem memorizedTimeline={memorizedTimeline} handleUpdateTask={handleUpdateTask} openTaskDialog={openTaskDialog} key={task.id} task={task}/>
          )
        })}
    </div>
  )
}

export default TaskTable