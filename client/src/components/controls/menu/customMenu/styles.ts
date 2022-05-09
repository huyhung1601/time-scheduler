import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    position: "relative",
    "& .selectHeader": {
      marginBottom: "5px",
      "& .addBtn": {
        border: "none",
        borderRadius: "50%",
        width: "16px",
        marginLeft: "5px",
        backgroundColor: "rgba(63,81,181,0.3)",
        color: "white",
        cursor: "pointer",
        fontSize: "14px",
        "&:hover": {
          backgroundColor: "rgba(63,81,181,1)",
        },
      },
    },
    "& .selectedItem": {
      borderBottom: "1px solid black",
      display: "flex",
      alignItems: "center",
      marginBottom: "0px",
    },
    "& .selectListWrapper": {
      height: "135px",
      overflowY: "auto",
      overflowX: "hidden",
      position: "absolute",
      borderRadius: "5px",
      border: "1px solid lightgray",
      right: -120,
      top: 0,
      zIndex: 3,
      backgroundColor: "rgba(239,239,239,0.5)",
      backdropFilter: "blur(3px)",
      "&::-webkit-scrollbar": {
        width: "1px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.1)",
        outline: "1px solid slategrey",
      },
      "& .selectList": {
        color: "black",
        width: "100%",
        listStyle: "none",
        "& .selectItems": {
          width: "100%",
          margin: "2px",
          listStyle: "none",
          display: "flex",
          alignItems: "center",
        },
      },
    },
  },
}));
