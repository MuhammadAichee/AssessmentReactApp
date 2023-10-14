import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISignUpReducer } from "./types";
import { getAllCountries } from "./thunk";

const initialState: ISignUpReducer = {
  countries: [],
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
  },
});
export const { setCountries } = SignUp.actions;
export default SignUp.reducer;
