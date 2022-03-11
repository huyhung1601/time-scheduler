import { makeStyles } from "@material-ui/styles"

export default makeStyles(theme=>({
    root:{
        backgroundColor: '#fff',
        width: '100%',
        padding: '2px',
        '& .MuiFormControl-root':{
            margin: '5px'
        },
        '& .MuiGrid-item':{
            display: 'flex',
            alignItem: 'center'
        }
    },
    
}))