import { SERVER_URL } from "Configuration/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Axios = axios.create();
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw error.response;
    }
  }
);
const fetchToken = () => {
  const token = `${localStorage.getItem("token")}`;
  return token;
};

export const testConnection = (url: string) => {
  return Axios.get(url);
};

export const getRequest = (url: string, hasHeaders: boolean = true) => {
  const token = fetchToken();
  return Axios.get(
    `${SERVER_URL}${url}`,
    hasHeaders
      ? {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      : undefined
  );
};

const buildHeadersAndParams = (
  hasHeaders: boolean,
  params: any,
  token: string
) => {
  if (hasHeaders)
    return {
      params: params,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  return { params: params };
};

export const getRequestWithParams = (
  url: string,
  hasHeaders: boolean = true,
  params: any
) => {
  const token = fetchToken();
  return Axios.get(
    `${SERVER_URL}${url}`,
    buildHeadersAndParams(hasHeaders, params, token)
  );
};

export const postRequest = (url: string, hasHeaders: boolean, data: any) => {
  const token = fetchToken();
  console.log(url, hasHeaders, data);
  return Axios.post(
    `${SERVER_URL}${url}`,
    data,
    hasHeaders
      ? {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      : undefined
  );
};

export const putRequest = (url: string, hasHeaders: boolean, data: any, id :string) => {
  const token = fetchToken();
  return Axios.put(
    `${SERVER_URL}${url}/${id}`,
    { ...data },
    hasHeaders
      ? {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      : undefined
  );
};

export const deleteRequest = (url: string, hasHeaders: boolean, id: any) => {
  const token = fetchToken();
  return Axios.delete(`${SERVER_URL}${url}/${id}`, {
    headers: hasHeaders
      ? {
          Authorization: "Bearer " + token,
        }
      : undefined,
  });
};
