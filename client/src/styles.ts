import { makeStyles } from "@material-ui/styles";

export default makeStyles ((theme)=>({
    root:{
        backgroundColor:'lightblue',
    },
    tableContainer:{        
        backgroundColor:'rgba(239, 239, 239, 0.5)',
        zIndex:2,
        borderRadius: '10px',
        minHeight: 'calc(100vh - 95px)',
        margin: '10px',
        boxShadow: '5px 1px 10px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(1px)',
    }

}))
