import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import tasksReducer from "./tasksReducer";


const reducers = combineReducers({
    tasks: tasksReducer,
    calendar: calendarReducer
})

export default reducers

export type State = ReturnType<typeof reducers>