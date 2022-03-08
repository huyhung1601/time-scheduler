import { Actiontype } from "../action-types";

interface GetTasks {
    type: Actiontype.getTasks
    payload: any
}

interface SetWeek {
    type: Actiontype.setWeek
    payload: any
}

interface DragItem {
    type: Actiontype.dragItem
    payload: any
}

interface CreateTask {
    type: Actiontype.createTask
    payload: any
}
export type Action = GetTasks | SetWeek |DragItem | CreateTask