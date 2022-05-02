import React, { useCallback, useEffect, useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import useStyles from "./styles";
import CustomSelect from "../customSelect/CustomSelect";
import { Add, Clear } from "@material-ui/icons";
import { AnyAction, Dispatch } from "redux";
interface IProps {
  categories: any[];
  task: any;
  onSelect: (selectedCategory: any) => void;
  createCategory: (
    category: any
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const initialValue = {
  addNew: false,
  newCategory: {
    title: "",
    logo: "none",
  },
};

const logoList = [
  { title: "none", logo: "none" },
  { title: "education", logo: "education" },
  { title: "work", logo: "work" },
  { title: "project", logo: "project" },
  { title: "family", logo: "family" },
];

const CategoryOptions: React.FC<IProps> = ({
  categories,
  task,
  onSelect,
  createCategory,
}) => {
  const [addCategory, setAddCategory] = useState(initialValue);
  const [logo, setLogo] = useState(logoList[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const classes = useStyles();

  const findCategory = (id: string) => {
    return categories.filter((x: any) => x.id === id)[0];
  };
  const memorizedSelectedCategory = findCategory(task.categoryId);

  const handleAddCategory = useCallback(() => {
    if (addCategory.newCategory.title.trim()) {
      createCategory(addCategory.newCategory);
      setLogo(logoList[0]);
      setAddCategory(initialValue);
    }
    setAddCategory((prev) => ({ ...prev, addNew: false }));
  }, [
    categories,
    addCategory.newCategory,
    createCategory,
    onSelect,
    setAddCategory,
  ]);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories[0]]);

  useEffect(() => {
    setSelectedCategory(memorizedSelectedCategory);
  }, []);

  useEffect(() => {
    onSelect(selectedCategory);
  }, [selectedCategory]);
  return (
    <div className={classes.categoryOptions}>
      {!addCategory.addNew && (
        <>
          <CustomSelect
            selected={selectedCategory}
            setSelected={(item: any) => setSelectedCategory(item)}
            showTitle={true}
            selectList={categories}
            label="Category"
            addOption={() => setAddCategory({ ...addCategory, addNew: true })}
          />
        </>
      )}
      {addCategory.addNew && (
        <div className={classes.categoryForm}>
          <CustomSelect
            selectList={logoList}
            showTitle={false}
            selected={logo}
            setSelected={(item: any) => {
              setLogo(item);
              setAddCategory((prev) => ({
                ...prev,
                newCategory: { ...prev.newCategory, logo: item.logo },
              }));
            }}
            label="Logo"
          />
          <TextField
            className="categoryInput"
            label="Category"
            value={addCategory.newCategory.title}
            onChange={(e) =>
              setAddCategory((prev) => ({
                ...prev,
                newCategory: { ...prev.newCategory, title: e.target.value },
              }))
            }
          />
          <IconButton onClick={handleAddCategory} size="small">
            {addCategory.newCategory.title.trim() ? <Add /> : <Clear />}
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default CategoryOptions;
