import { useCallback } from "react";
import ResizableItem from "../resizableItem/ResizableItem";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/reducers";
import useStyle from "./styles";
import { TaskProps } from "../../store/actions";
import { useTaskDialogContext } from "../../context/TaskDialogContext";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import CategoryCard from "../categoryCard/CategoryCard";
import DroppableContainer from "../droppableContainer/DroppableContainer";

interface IProps {
  categories: any;
}
const Tasktable = ({ categories }: IProps) => {
  console.log(categories);
  /**MUI style */
  const classes = useStyle();
  /**Redux & context*/
  const dispatch = useDispatch();
  const { updateTask } = bindActionCreators(actionCreators, dispatch);
  const { tasks, calendar } = useSelector((state: State) => state);
  const { editTask } = useTaskDialogContext();
  //Handle Drag & Drop
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    console.log(destination, result);
    //Drop Item
  };

  const openTaskDialog = useCallback((movingTask) => {
    editTask && editTask(movingTask);
  }, []);

  const handleUpdateTask = useCallback((movingTask) => {
    updateTask && updateTask(movingTask);
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.tasktable}>
        <div className={classes.tasktableTop}>
          <div className="logo">
            <PlaylistAddIcon color="primary" />
          </div>
          <div className="title"> Create New Category</div>
        </div>
        <div className={classes.tasktableBody}>
          {categories.map((c: any) => {
            return (              
                <DroppableContainer droppableId={c.id}>
                  <CategoryCard key={c.id} category={c} />
                </DroppableContainer>
            );
          })}
          <DroppableContainer droppableId="uncategorized">
            {tasks.tasks.map((task: TaskProps, index: number) => {
              return (
                <ResizableItem
                  type={calendar.type}
                  timeline={calendar.timeline}
                  handleUpdateTask={handleUpdateTask}
                  openTaskDialog={openTaskDialog}
                  key={task.id}
                  task={task}
                  index={index}
                />
              );
            })}
          </DroppableContainer>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Tasktable;
