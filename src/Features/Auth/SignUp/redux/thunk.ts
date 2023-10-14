import { createAsyncThunk } from "@reduxjs/toolkit";
import { COUNTRIES_URL, SIGNUP_URL } from "Configuration/constants";
import { getRequest, postRequest } from "Utilties/ApiHelper/apiHelpers";
import { ISignUp } from "./types";

export const signup = createAsyncThunk(
  SIGNUP_URL,
  async (signupPayload: ISignUp) => {
    const response = await postRequest(SIGNUP_URL, false, signupPayload);
    return response.data;
  }
);

export const getAllCountries = createAsyncThunk(
  COUNTRIES_URL,
  async () => {
    const response = await getRequest(COUNTRIES_URL, false);
    return response.data;
  }
);
