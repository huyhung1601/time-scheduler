import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    root:{
        '& .MuiTableCell-root':{
            margin: '0px',
        padding: '0px',
        position: 'relative',
        }
    },
    empty:{
    width: '100%',
        height: '100%',
      display: 'flex',
      alignItems: 'center' ,
      justifyContent: 'center' ,
      backgroundColor: '#f1f1f1'
    },        
    month:{
        height: '89px',
    },
    week:{
        height: '44px'
    },
    taskContainer:{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '100%',
        height: '100%',
        padding: '1px',
        '& .containerHeader':{
            fontSize: '10px'
        },
        '& .containerBody':{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
        }
    }

}))