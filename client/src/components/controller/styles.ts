import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme=>({
    root:{
        backgroundColor: '#fff',
        width: '100%',
        padding: '2px',
        '& .MuiFormControl-root':{
            margin: '5px'
        },
        '& .MuiGrid-root':{
            display: 'flex',
            alignItems: 'center',
        },
        '& .MuiButton-root':{
            height: '40px'
        }
    },
    
}))