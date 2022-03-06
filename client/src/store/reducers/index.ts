import { combineReducers } from "redux";
import datesReducer from "./datesReducer";
import tasksReducer from "./tasksReducer";


const reducers = combineReducers({
    tasks: tasksReducer,
    dates: datesReducer
})

export default reducers

export type State = ReturnType<typeof reducers>