import { useCallback, useState } from "react";
import { ITask } from "../features/tasks/tasksSlice";
import { useValidate } from "./useValidate";

export const useForm = <T extends ITask>(
  initialValues: T,
  errors?: any,
  formValidate?: string
) => {
  const [values, setValues] = useState(initialValues);
  const [errs, setErrs] = useState(errors);

  const [validate] = useValidate(setErrs, formValidate);

  const handleChange = useCallback(
    (name: string, value: string | number | boolean) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      validate && validate({ ...values, [name]: value });
    },
    [values, setValues, validate]
  );

  const resetValues = useCallback(() => {
    setValues(initialValues);
  }, [initialValues, setValues]);

  const handleErrs = useCallback(
    (key: string, error: string) => {
      setErrs((prev: any) => ({ ...prev, [key]: error }));
    },
    [setErrs]
  );

  const resetErrs = useCallback(() => {
    setErrs(errors);
  }, [errors, setErrs]);

  return {
    values,
    errs,
    handleChange,
    setValues,
    resetValues,
    handleErrs,
    resetErrs,
    setErrs,
    validate,
  };
};
