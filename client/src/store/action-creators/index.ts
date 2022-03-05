import { Dispatch } from "redux"
import { Actiontype } from "../action-types"

export const getTasks = (datas: any) =>{
    return (dispatch: Dispatch) =>{
        dispatch({
            type: Actiontype.getTasks,
            payload: datas
        })
    }
}

export const drawTable = () =>{
    return (dispath: Dispatch) =>{
        dispath({
            type: Actiontype.drawTable
        })
    }
}

export const dragItem = (result: any) =>{
    return (dispatch: Dispatch) =>{
        dispatch({
            type: Actiontype.dragItem,
            payload: result
        })
    }
}