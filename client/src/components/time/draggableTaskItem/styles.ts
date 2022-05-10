import { makeStyles } from "@material-ui/core";

export default makeStyles((theme: any) => ({
  taskItem: {
    borderRadius: "3px",
    padding: "1px",
    width: "98%",
    margin: "2px",
    fontSize: "11px",
    backgroundColor: "#57aecb",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    background:
      "linear-gradient(-45deg, rgba(0,0,0,0.22), rgba(255,255,255,0.25))",
    boxShadow:
      "1px 0px 6px 0 rgba(0, 0, 0, 0.25); -2px -1px 5px 0 rgba(255, 255, 255, 0.1)",
  },
  prev: {
    backgroundColor: "lightgray",
  },
  next: {
    backgroundColor: "lightgreen",
  },
}));
