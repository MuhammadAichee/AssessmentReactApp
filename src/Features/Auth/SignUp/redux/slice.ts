import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISignUpReducer } from "./types";
import { getAllCities, getAllCountries, getAllStates } from "./thunk";

const initialState: ISignUpReducer = {
  countries: [],
  states : [],
  cities : []
};

export const SignUp = createSlice({
  name: "SignUpSlice",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        countries: action.payload,
      };
    },
  },
  extraReducers(builder) {
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
export const { setCountries } = SignUp.actions;
export default SignUp.reducer;
