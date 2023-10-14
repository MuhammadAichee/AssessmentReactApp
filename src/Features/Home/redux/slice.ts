import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHomeReducer } from "./types";
import { getAllUsers } from "./thunk";

const initialState: IHomeReducer = {
  users: [],
};

export const Home = createSlice({
  name: "HomeSlice",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;    
    });
  },
});
export const { setUsers } = Home.actions;
export default Home.reducer;
