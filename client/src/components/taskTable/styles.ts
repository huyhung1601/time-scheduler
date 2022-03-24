import { makeStyles } from "@material-ui/styles";

export default  makeStyles ((theme)=>({
    tasktable: {       
    overflow: 'auto',
    overflowX: 'hidden',
    },
    tasktableTop:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen'
    },
    tasktableBody:{
        
    }
    
}))