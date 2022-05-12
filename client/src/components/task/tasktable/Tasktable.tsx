import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyle from "./styles";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CategoryCard from "../categoryCard/CategoryCard";
import { DroppableContainer } from "../../customElements";
import {
  dropToChangeCategory,
  ITask,
  updateTask,
} from "../../../features/tasks/tasksSlice";
import { RootState } from "../../../app/store";

interface IProps {
  categories: any;
  tasks: any;
  editTask: (task: ITask) => void;
}
const Tasktable = ({ categories, tasks, editTask }: IProps) => {
  /**MUI style */
  const classes = useStyle();
  /**Redux & context*/
  const dispatch = useDispatch();

  const { calendar } = useSelector((state: RootState) => state);
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
    dispatch(dropToChangeCategory(result));
  };

  useEffect(() => {
    dispatch(updateTask?.(tasks.droppedTask));
  }, [tasks.droppedTask, dispatch]);

  const handleUpdateTask = useCallback(
    (movingTask) => {
      dispatch(updateTask?.(movingTask));
    },
    [dispatch]
  );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.tasktable}>
        <div className={classes.tasktableBody}>
          {categories.map((c: any) => {
            return (
              <DroppableContainer droppableId={c.id}>
                <CategoryCard
                  editTask={editTask}
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
