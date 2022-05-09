import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  itemContainer: {
    position: "relative",
    width: "100%",
    height: "40px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottom: '1px solid lightgray',
  },
  itemInfos:{
    '& .itemInfo':{
      marginRight: '10px'
    }
  },
  resizableItem: {
    position: "relative",
    bottom: "2px",
    minWidth: "1%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",    
    flexDirection: 'column',
    '& .timebar':{   
      background: 'linear-gradient(-45deg, rgba(0,0,0,0.22), rgba(255,255,255,0.25))',
      boxShadow: '1px 0px 6px 0 rgba(0, 0, 0, 0.25); -2px -2px 15px 0 rgba(255, 255, 255, 0.3)',
      minWidth: '2%',
      width: "100%",
      height: '15px',
      position: "relative",
      cursor: "pointer",
      borderRadius: "5px",
      '&:hover':{
        "& .resizer":{
          visibility: 'visible'
        }
      },
      "& .resizer": {
        visibility: 'hidden',
        position: "absolute",
        zIndex: "2px",
        width: "5px",
        height: "100%",
        backgroundColor: "black",
      },
      "& .left": {        
        cursor: "w-resize",
        left: "-1px",      
        borderRadius: "5px 0 0 5px",
      },
      "& .right": {
        cursor: "e-resize",
        right: "-1px",
        borderRadius: "0 5px 5px 0",

      },
    },
    '& .lightgray':{
      backgroundColor: 'lightgray'
    },
    '& .lightgreen':{
      backgroundColor: 'lightgreen'
    }
  },
}));
