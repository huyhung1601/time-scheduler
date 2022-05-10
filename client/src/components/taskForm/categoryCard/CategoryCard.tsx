import useStyles from "./styles";
import { CustomLogo } from "../../controls";
import ResizableItem from "../../task/resizableItem/ResizableItem";
import { ITask } from "../../../features/tasks/tasksSlice";
interface IProps {
  category: any;
  tasks: ITask[];
  calendar: any;
  openTaskDialog: (movingTask: any) => void;
  handleUpdateTask: (movingTask: any) => void;
}
const CategoryCard = ({
  category,
  tasks,
  calendar,
  openTaskDialog,
  handleUpdateTask,
}: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <div className="cardHeader">
        <CustomLogo logo={category.logo} />
        <div className="title">{category.title}</div>
      </div>
      <div className="cardBody">
        {tasks.map(
          (task: ITask, index: number) =>
            task.categoryId === category.id && (
              <ResizableItem
                type={calendar.type}
                timeline={calendar.timeline}
                handleUpdateTask={(movingTask: any) =>
                  handleUpdateTask(movingTask)
                }
                openTaskDialog={(movingTask: any) => openTaskDialog(movingTask)}
                key={task.id}
                task={task}
                index={index}
              />
            )
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
