import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serverCreateCategory, serverGetCategories } from "../../server";

interface ICategoriesState {
  loading: boolean;
  categories: ICategories[];
  newlyCreatedCategory: null | ICategories;
}
export interface ICategories {
  id?: string;
  title: string;
  logo: string;
}

const initialState: ICategoriesState = {
  loading: false,
  categories: [],
  newlyCreatedCategory: null,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const res: ICategories[] = await serverGetCategories();
    return res;
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: ICategories) => {
    const res: ICategories = await serverCreateCategory(newCategory);
    return res;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearNewCategoryTemp: (state) => {
      state.newlyCreatedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCategories.fulfilled,
      (state: ICategoriesState, action: PayloadAction<ICategories[]>) => {
        state.categories = action.payload;
      }
    );
    builder.addCase(
      createCategory.fulfilled,
      (state: ICategoriesState, action: PayloadAction<ICategories>) => {
        state.categories = [action.payload, ...state.categories];
        state.newlyCreatedCategory = action.payload;
      }
    );
  },
});

export const { clearNewCategoryTemp } = categoriesSlice.actions;
