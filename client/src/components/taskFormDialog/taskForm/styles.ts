import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  taskForm: {
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
