import React from "react";
import useStyles from "./styles";
import { Droppable } from "react-beautiful-dnd";
import DroppableContainer from "../droppableContainer/DroppableContainer";
import CategoryLogo from "../categoryLogo/CategoryLogo";

interface IProps {
  category: any;
}
const CategoryCard = ({ category }: IProps) => {
  const classes = useStyles();
  console.log(category)
  return (
    <div className={classes.cardContainer}>
      <div className="cardHeader">
      <CategoryLogo logo = {category.type}/>
      <div className="title">{category.title}</div>
      </div>
      <div className="cardBody">
      </div>
    </div>
  );
};

export default CategoryCard;
