import { Dispatch } from "redux"
import { addNewTask, selectedTasks, serverUpdateTask } from "../../server"
import { Actiontype } from "../action-types"
import { CalendarProps, TaskProps } from "../actions"



export const setCalendar = ({selectedDate,timeline,type}: CalendarProps) =>{
    return async (dispath: Dispatch) =>{
        dispath({
            type: Actiontype.setCalendar,
            payload: {selectedDate,timeline,type}
        })        
    }
}

export const getTasks = ({selectedDate,type}:any) =>{
    return async (dispatch: Dispatch) =>{
        const response = await selectedTasks({selectedDate,type})
        dispatch({
            type: Actiontype.getTasks,
            payload: response
        })
    }
}

export const dropItem = (result: any,dates: any) =>{
    return (dispatch: Dispatch) =>{
        dispatch({
            type: Actiontype.dropItem,
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

export const updateTask = (updateTask: TaskProps)=>{
    return async (dispatch: Dispatch) =>{
        const res = await serverUpdateTask(updateTask)
        dispatch({
            type: Actiontype,
            payload: updateTask
        })
    }
}