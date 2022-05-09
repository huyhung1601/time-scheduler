import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    "& .MuiPaper-root": {
      padding: "0",
    },
    "& .MuiDialogContent-root": {
      minHeight: "150px",
    },
  },
  taskContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
  },
  dateContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
  },
  category: {},
}));
