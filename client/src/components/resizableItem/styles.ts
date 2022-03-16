import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "50px",
    backgroundColor: "gray",
  },
  resizableItem: {
    position: "relative",
    top: "2px",
    cursor: "pointer",
    width: " 50px",
    height: "46px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "5px",
    "& .resizer": {
      position: "absolute",
      zIndex: "2px",
      width: "2px",
      height: "50%",
      backgroundColor: "black",
    },
    "& .left": {
      cursor: "w-resize",
      color: "red",
      left: "-1px",
    },
    "& .right": {
      cursor: "e-resize",
      color: "red",
      right: "-1px",
    },
  },
}));
