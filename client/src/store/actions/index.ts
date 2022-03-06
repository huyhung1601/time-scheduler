import { Actiontype } from "../action-types";

interface GetTasks {
    type: Actiontype.getTasks
    payload: any
}

interface SetDates {
    type: Actiontype.setDates
    payload: any
}

interface DragItem {
    type: Actiontype.dragItem
    payload: any
}
export type Action = GetTasks | SetDates |DragItem