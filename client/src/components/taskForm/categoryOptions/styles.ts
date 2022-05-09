import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  categoryOptions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .autocomplete": {
      width: "70%",
    },
    "& .MuiFormControl-root": {
      marginLeft: "3px",
    },
  },
  categoryOption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  categoryForm: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .categoryInput": {
      width: "60%",
    },
  },
  categoryBtns: {
    backgroundColor: "lightgray",
  },
}));
