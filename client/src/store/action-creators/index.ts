import { Dispatch } from "redux"
import { addNewTask, selectedTasks } from "../../utils"
import { Actiontype } from "../action-types"



export const setWeek = (selectedDate: any,timeline: any) =>{
    return async (dispath: Dispatch) =>{
        dispath({
            type: Actiontype.setWeek,
            payload: {selectedDate,timeline}
        })        
    }
}

export const getTasks = (dates: any) =>{
    return async (dispatch: Dispatch) =>{
        const response = await selectedTasks(dates)
        dispatch({
            type: Actiontype.getTasks,
            payload: response
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


export const createTask = (newTask: any,calendar: any) =>{
    return async (dispatch: Dispatch) =>{
        const res = await addNewTask(newTask)
        dispatch({
            type: Actiontype.createTask,
            payload: {task: res,calendar}
        })
    }
}