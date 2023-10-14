import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHomeReducer } from "./types";
import { getAllCities, getAllCountries, getAllStates, getAllUsers } from "./thunk";

const initialState: IHomeReducer = {
  users: [],
  count : 0,
  selectedUser : {
    username: "",
    email: "",
    country : {
      name : "",
      _id: ""
    },
    _id : "-1",
    state :{
      name : "",
      _id: "",
      country : "",
    },
    city : {
      name : "",
      _id: "",
      country : "",
      state: ""
    }
  },
  isModelOpen : false,
  countries: [],
  states : [],
  cities : []
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
    setSelectedUser: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        selectedUser: action.payload,
      };
    },
    setIsModalOpen: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isModelOpen: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;    
        state.count = action.payload.count;
    });
    builder.addCase(getAllCountries.fulfilled, (state, action) => {
      state.countries = action.payload.countries;    
  });
  builder.addCase(getAllCities.fulfilled, (state, action) => {
      state.cities = action.payload.cities;    
  });
  builder.addCase(getAllStates.fulfilled, (state, action) => {
      state.states = action.payload.states;    
  });
  },
});
export const { setUsers, setSelectedUser, setIsModalOpen } = Home.actions;
export default Home.reducer;
