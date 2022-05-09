import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import categoriesReducer from "./categoriesReducer";
import tasksReducer from "./tasksReducer";


const reducers = combineReducers({
    tasks: tasksReducer,
    calendar: calendarReducer,
    categories: categoriesReducer,
})

export default reducers

export type State = ReturnType<typeof reducers>