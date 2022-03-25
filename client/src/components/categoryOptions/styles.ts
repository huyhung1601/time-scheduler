import { makeStyles } from "@material-ui/styles";

export default makeStyles ((theme)=>({
    categoryOptions:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .autocomplete':{
            width: '70%',
        },
        '& .addNewBtn':{
            backgroundColor: 'lightgray'
        }
    },
    categoryOption:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    }
}))