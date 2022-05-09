import { Actiontype } from "../action-types";
import { Action } from "../actions";

const initialState = {
  loading: false,
  categories: [],
  newlyCreatedCategory: null,
};

export interface ICategoryReducer {
  loading: Boolean;
  categories: any[];
  newlyCreatedCategory: any;
}
const categoriesReducer = (
  state: ICategoryReducer = initialState,
  action: Action
) => {
  switch (action.type) {
    case Actiontype.getCategories:
      return {
        ...state,
        categories: action.payload,
      };
    // case Actiontype.getCategories:
    //   return {
    //     ...state,
    //     categories: [...state.categories, action.payload].sort(
    //       (a: any, b: any) => a.logo - b.logo
    //     ),
    //   };
    case Actiontype.createCategory:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        newlyCreatedCategory: action.payload,
      };
    case Actiontype.clearNewCategoryTemp:
      return {
        ...state,
        newlyCreatedCategory: null,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
