import { Actiontype } from "../action-types";

interface GroupAction {
    type: Actiontype.getTasks
    payload: any
}

interface DrawTableAction {
    type: Actiontype.drawTable
}

interface DragItem {
    type: Actiontype.dragItem
    payload: any
}
export type Action = GroupAction | DrawTableAction |DragItem