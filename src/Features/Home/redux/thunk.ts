import { createAsyncThunk } from "@reduxjs/toolkit";
import { CITY_URL, COUNTRIES_URL, SIGNUP_URL, STATE_URL } from "Configuration/constants";
import { deleteRequest, getRequest, getRequestWithParams, putRequest } from "Utilties/ApiHelper/apiHelpers";
import { IEditUserPayload, IGetUserParams } from "./types";

export const getAllUsers = createAsyncThunk(SIGNUP_URL, async () => {
  const response = await getRequest(SIGNUP_URL, false);
  return response.data;
});

export const getAllUsersWithParams = createAsyncThunk(
  SIGNUP_URL,
  async (params: IGetUserParams) => {
    const response = await getRequestWithParams(SIGNUP_URL, true, params);
    return response.data;
  }
);
export const deleteUser = createAsyncThunk(
  SIGNUP_URL,
  async (id: string) => {
    const response = await deleteRequest(SIGNUP_URL, true, id);
    return response.data;
  }
);
export const editUser = createAsyncThunk(
  SIGNUP_URL,
  async (data: IEditUserPayload) => {
    const response = await putRequest(SIGNUP_URL, true, data, data.id);
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