import React from "react";
import useStyles from "./styles";
import { TextField } from "@material-ui/core";
import CategoryMenu from "../categoryMenu/CategoryMenu";

export const TaskForm = (props: any) => {
  const { task, errs, categories, onChange, onSelect, onCreateCategory } =
    props;
  const classes = useStyles();
  return (
    <>
      <div className={classes.taskForm}>
        <div>
          <TextField
            name="name"
            onChange={onChange}
            value={task.name}
            label="Task"
            fullWidth
            {...(errs.task && { error: true, helperText: errs.task })}
          />
        </div>
        <div>
          <CategoryMenu
            task={task}
            onSelect={onSelect}
            categories={categories.categories}
            createCategory={onCreateCategory}
          />
        </div>
      </div>
      <div className={classes.dateContainer}>
        <TextField
          label="start"
          type="datetime-local"
          value={task.start}
          name="start"
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          {...(errs.start && { error: true, helperText: errs.start })}
        />
        <TextField
          label="end"
          type="datetime-local"
          value={task.end}
          name="end"
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          {...(errs.end && { error: true, helperText: errs.end })}
        />
      </div>
    </>
  );
};
