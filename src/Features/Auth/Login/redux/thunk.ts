import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_URL } from "Configuration/constants";
import { postRequest } from "Utilties/ApiHelper/apiHelpers";
import { ILogin } from "./types";

export const postLogin = createAsyncThunk(
  'api/account/Login',
  async (loginPayload: ILogin) => {
  const response = await postRequest(LOGIN_URL, false, loginPayload);
  return response.data;
  });


