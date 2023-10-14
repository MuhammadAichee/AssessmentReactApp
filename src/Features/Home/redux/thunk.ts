import { createAsyncThunk } from "@reduxjs/toolkit";
import { SIGNUP_URL } from "Configuration/constants";
import { deleteRequest, getRequest, getRequestWithParams } from "Utilties/ApiHelper/apiHelpers";
import { IGetUserParams, IUser } from "./types";

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
