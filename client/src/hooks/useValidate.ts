import { useCallback } from "react";
import { TaskFormErrs } from "../App";
import { ITask } from "../features/tasks/tasksSlice";

export const useValidate = (setErrs: any, formValidate?: string) => {
  const taskFormValidate = useCallback(
    (fieldValues: ITask): boolean => {
      let temp = {} as TaskFormErrs;
      const compare =
        new Date(fieldValues.end!).getTime() -
        new Date(fieldValues.start!).getTime();
      if ("name" in fieldValues) {
        temp.task =
          fieldValues.name?.trim() === "" ? "please fill the task" : "";
      }
      if ("start" in fieldValues) {
        temp.start =
          fieldValues.start?.trim() === ""
            ? "please pick start time"
            : compare && compare < 0
            ? "start time must before end time"
            : "";
      }
      if ("end" in fieldValues) {
        temp.end =
          fieldValues.end?.trim() === ""
            ? "please pick end time"
            : compare && compare < 0
            ? "end time must be after start time"
            : "";
      }
      setErrs({ ...temp });

      return Object.values(temp).every((x) => x === "");
    },
    [setErrs]
  );

  console.log(Object.keys(useValidate));

  return [formValidate === "taskFormValidate" && taskFormValidate];
};
