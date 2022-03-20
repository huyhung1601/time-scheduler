import React from 'react'
import ResizableItem from '../resizableItem/ResizableItem'
import {useDispatch,useSelector} from 'react-redux'
import {State} from '../../store/reducers'
import useStyle from './styles'
import { TaskProps } from '../../store/actions'
const TaskTable = () => {
  /**MUI style */
  const classes = useStyle()
  /**Redux */
  const dispatch = useDispatch()
  const { tasks } = useSelector((state: State) => state);

  return (
    <div className={classes.taskTable}>
      
        {tasks.tasks.map((task: TaskProps)=>{
          return(
          <ResizableItem key={task.id} task={task}/>
          )
        })}
    </div>
  )
}

export default TaskTable