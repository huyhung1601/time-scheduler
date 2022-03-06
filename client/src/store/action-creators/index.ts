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

export const setWeek = (selectedDate: any,timeline: any) =>{
    return (dispath: Dispatch) =>{
        dispath({
            type: Actiontype.setWeek,
            payload: {selectedDate,timeline}
        })
    }
}

export const dragItem = (result: any,dates: any) =>{
    return (dispatch: Dispatch) =>{
        dispatch({
            type: Actiontype.dragItem,
            payload: {result, dates}
        })
    }
}