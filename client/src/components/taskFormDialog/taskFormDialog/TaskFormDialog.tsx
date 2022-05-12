import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import {
  clearNewCategoryTemp,
  createCategory,
} from "../../../features/categories/categoriesSlice";
import { useCallback } from "react";
import { RootState } from "../../../app/store";
import { CustomDialog } from "../../customElements";
import { TaskForm } from "../taskForm/TaskForm";
import { ITask } from "../../../features/tasks/tasksSlice";
import { TaskFormErrs } from "../../../App";

interface IProps {
  openDialog: boolean;
  values: ITask;
  errs: TaskFormErrs;
  handleChange: (name: string, value: string) => void;
  onCloseDialog: () => void;
  handleSubmit: () => void;
}

export const TaskFormDialog = (props: IProps) => {
  const {
    openDialog,
    values,
    errs,
    handleChange,
    onCloseDialog,
    handleSubmit,
  } = props;
  const [waitingForNewCat, setWaitingForNewCat] = useState(false);

  /**MUI styles */
  const classes = useStyles();
  /**Redux && context */
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state);
  const { newlyCreatedCategory } = categories;

  /**Hanle Change */
  const onChange = (e: any): string | void => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange(name, value);
  };
  const onSelect = useCallback(
    (selectedCategory: any) => {
      handleChange("categoryId", selectedCategory.id);
    },
    [handleChange]
  );

  const onCreateCategory = (cat: any) => {
    setWaitingForNewCat(true);
    dispatch(createCategory(cat));
  };

  useEffect(() => {
    if (waitingForNewCat && !!newlyCreatedCategory) {
      // update local task with new cat
      onSelect(newlyCreatedCategory);
      // stop waiting
      setWaitingForNewCat(false);
      dispatch(clearNewCategoryTemp());
    }
  }, [waitingForNewCat, newlyCreatedCategory, onSelect, dispatch]);

  return (
    <CustomDialog
      className={classes.root}
      open={openDialog}
      onSave={handleSubmit}
      onCancel={onCloseDialog}
      onClose={onCloseDialog}
    >
      <TaskForm
        task={values}
        errs={errs}
        categories={categories}
        onChange={onChange}
        onSelect={onSelect}
        onCreateCategory={onCreateCategory}
      />
    </CustomDialog>
  );
};
