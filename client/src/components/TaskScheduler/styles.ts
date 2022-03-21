import zIndex from "@material-ui/core/styles/zIndex";
import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  taskSchedulerContainer: {
    minHeight: "calc(100vh - 90px)",
    border: "1px solid black",
    borderRadius: "5px",
    "& .month":{
      textAlign: 'center',
      flexDirection: 'column',
      '& .monthTop':{
        width: '100%',
        height: '100%',
        borderBottom: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '& .dates':{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        
        '& .date':{
          height: '25px',
          width: '100%',
          borderRight: '1px solid black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }
    },
    "& .timeline": {
      height: "60px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid black",
      
      "& .timemark": {
        height: "100%",
        borderTop: "none",
        borderRight: "1px solid black",
        textAlign: "center",
        width: " 100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        "& .date":{
          width: '100%',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        "& .hours": {
          height: '25px',
          width: "100%",
          borderTop: "1px solid lightgray",
          textAlign: "left",
          position: "relative",
          display: "flex",
          alignItems: "start",
          justifyContent: "space-evenly",
          "& .hour": {
            marginTop: '5px',
            width: "100%",
          },
        },
      },
      "& .today": {
        backgroundColor: "#57aecb",
      },
    },
    
  },
}));
