import useStyles from "./styles";
import CategoryLogo from "../categoryLogo/CategoryLogo";
import ResizableItem from "../resizableItem/ResizableItem";
import { TaskProps } from "../../store/actions";
import { Droppable } from "react-beautiful-dnd";
interface IProps {
  category: any;
  tasks: TaskProps[]
  calendar: any
  openTaskDialog: (movingTask:any)=>void
  handleUpdateTask: (movingTask:any) =>  void
}
const CategoryCard = ({ category,tasks,calendar,openTaskDialog,handleUpdateTask }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <div className="cardHeader">
      <CategoryLogo logo = {category.type}/>
      <div className="title">{category.title}</div>
      </div>
      <div className="cardBody">
      {tasks.map((task: TaskProps, index: number) => task.category === category.id && 
                <ResizableItem
                  type={calendar.type}
                  timeline={calendar.timeline}
                  handleUpdateTask={(movingTask:any)=>handleUpdateTask(movingTask)}
                  openTaskDialog={(movingTask:any)=>openTaskDialog(movingTask)}
                  key={task.id}
                  task={task}
                  index={index}
                />
              
            )}
      </div>
    </div>
  );
};

export default CategoryCard;
