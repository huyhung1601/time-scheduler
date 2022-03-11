import { Actiontype } from "../action-types";

export interface TaskProps {
    id?: string
    task: string
    start: string
    end: string
}
interface GetTasks {
    type: Actiontype.getTasks
    payload: TaskProps[]
}

interface SetWeek {
    type: Actiontype.setWeek
    payload: any
}

interface DropItem {
    type: Actiontype.dropItem
    payload: any
}

interface CreateTask {
    type: Actiontype.createTask
    payload: {task: TaskProps, calendar: any}
}

interface UpdateTask {
    type: Actiontype.updateTask
    payload: TaskProps
}
export type Action = GetTasks | SetWeek |DropItem | CreateTask |UpdateTask