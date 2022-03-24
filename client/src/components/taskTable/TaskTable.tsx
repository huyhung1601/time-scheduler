import { useCallback } from 'react'
import ResizableItem from '../resizableItem/ResizableItem'
import {useDispatch,useSelector} from 'react-redux'
import {State} from '../../store/reducers'
import useStyle from './styles'
import { TaskProps } from '../../store/actions'
import { useTaskDialogContext } from "../../context/TaskDialogContext";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

interface IProps {
  categories: any
}
const Tasktable = ({categories}: IProps) => {
  console.log(categories)
  /**MUI style */
  const classes = useStyle()
  /**Redux */
  const dispatch = useDispatch()
  const { updateTask } = bindActionCreators(actionCreators, dispatch);

  const { tasks,calendar } = useSelector((state: State) => state);
  
  const { editTask } = useTaskDialogContext();

  const openTaskDialog = useCallback((movingTask)=>{
    editTask && editTask(movingTask);
  },[])

  const handleUpdateTask = useCallback((movingTask)=>{
    updateTask && updateTask(movingTask)
  },[])
  return (
    <div className={classes.tasktable}>      
      <div className={classes.tasktableTop}>
        <div className="logo">
          <PlaylistAddIcon color='primary' />
        </div>
        <div className="title"> Create New Category</div>
      </div>
        {categories.map((c:any)=>{
          return(
            <div>c.title</div>
          )
        })}
        {tasks.tasks.map((task: TaskProps)=>{
          return(
          <ResizableItem type={calendar.type} timeline={calendar.timeline} handleUpdateTask={handleUpdateTask} openTaskDialog={openTaskDialog} key={task.id} task={task}/>
          )
        })}
    </div>
  )
}

export default Tasktable