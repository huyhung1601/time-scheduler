import { makeStyles } from "@material-ui/core";

export default makeStyles (()=>({
    root:{
        '& .MuiFormControl-root':{
            margin: '5px'
        }
        
    },
    dateContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        
    }
}))