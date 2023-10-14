import { createAsyncThunk } from "@reduxjs/toolkit";
import { CITY_URL, COUNTRIES_URL, SIGNUP_URL, STATE_URL } from "Configuration/constants";
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

export const getAllStates = createAsyncThunk(
  STATE_URL,
  async (state:string) => {
    const response = await getRequest(`${STATE_URL}/${state}`, false);
    return response.data;
  }
);

export const getAllCities = createAsyncThunk(
  CITY_URL,
  async (city:string) => {
    const response = await getRequest(`${CITY_URL}/${city}`, false);
    return response.data;
  }
);
