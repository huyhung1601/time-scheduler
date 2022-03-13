import {makeStyles, withWidth} from '@material-ui/core'

export default makeStyles((theme:any)=>({
    task:{
        width: '98%',
        margin:'1px',
        fontSize: '11px',
        backgroundColor: '#57aecb'
        
    },
    prev:{
        backgroundColor: 'lightgray'

    } ,
    next:{
        backgroundColor: 'lightblue'

    }
}))