import { Actiontype } from "../action-types";
import { Action } from "../actions";

const initialState ={
    loading: false,
    categories: [],
}

export interface ICategory {
    loading: Boolean
    categories: any[]
}
const categoriesReducer = (state: ICategory  = initialState, action: Action) =>{
    switch (action.type) {
        case Actiontype.getCategories:
            return {
                ...state,
                categories: action.payload
            }
        case Actiontype.getCategories:
            return{
                ...state,
                categories: [...state.categories, action.payload].sort((a:any,b:any)=> a.logo - b.logo)
            }
        default:
            return state;
    }
}

export default categoriesReducer