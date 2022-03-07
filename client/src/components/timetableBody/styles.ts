import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    root:{
    },    
    
    tableCell:{
        margin: '0px',
        padding: '2px',
        height: '40px',
        position: 'relative'
    },
    taskContainer:{
        position: 'absolute',
        height: '40px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: '0',
        left: '0'

    }

}))