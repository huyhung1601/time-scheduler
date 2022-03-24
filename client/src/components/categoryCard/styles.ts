import { makeStyles } from "@material-ui/styles"


export default makeStyles ((theme)=>({
    cardContainer:{
        backgroundColor: 'lightblue',
        margin: '3px 0px 3px 0px',
        '& .cardHeader':{
            display: 'flex',
            textAlign: 'center',

        },
        '& .cardBody':{
            backgroundColor: 'white',
            height: '100px',
        }
    }
}))