import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import {LoaderStateType} from "./types";

const initialState : LoaderStateType = {
  loading: false
};

export const Loader = createSlice({
  name: "fullPageLoader",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
  extraReducers(builder) {
    
  },
});
export const {setLoadingState} = Loader.actions;
export default Loader.reducer;
