import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/reducers";
import useStyle from "./styles";
import { useTaskDialogContext } from "../../context/TaskDialogContext";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CategoryCard from "../categoryCard/CategoryCard";
import DroppableContainer from "../droppableContainer/DroppableContainer";

interface IProps {
  categories: any;
  tasks: any;
}
const Tasktable = ({ categories, tasks }: IProps) => {
  /**MUI style */
  const classes = useStyle();
  /**Redux & context*/
  const dispatch = useDispatch();
  const { updateTask, changeCategory } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const { calendar } = useSelector((state: State) => state);
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
    changeCategory(result);
  };

  useEffect(() => {
    updateTask && updateTask(tasks.modifdiedTask);
  }, [tasks.modifiedTask]);

  const openTaskDialog = useCallback((movingTask) => {
    editTask && editTask(movingTask);
  }, []);

  const handleUpdateTask = useCallback((movingTask) => {
    updateTask && updateTask(movingTask);
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.tasktable}>
        <div className={classes.tasktableBody}>
          {categories.map((c: any) => {
            return (
              <DroppableContainer droppableId={c.id}>
                <CategoryCard
                  openTaskDialog={openTaskDialog}
                  handleUpdateTask={handleUpdateTask}
                  calendar={calendar}
                  tasks={tasks}
                  key={c.id}
                  category={c}
                />
              </DroppableContainer>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Tasktable;
