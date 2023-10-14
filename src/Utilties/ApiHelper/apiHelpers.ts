import { SERVER_URL } from "Configuration/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Axios = axios.create();
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    debugger;
    //Error from Server
    if (error.response) {
      // interceptor to redirect user to login page if not authorized
      if (error.response.status === 401) {
        // if response status is 401 unauthorised
        localStorage.removeItem("token"); // remove token from local storage
        localStorage.removeItem("username"); // remove user data from local storage
        if (window.location.pathname !== "/") {
          const history = useNavigate();
          history("/"); // redirect to login page
        }
      }
      if (
        error.response.status === 500 &&
        localStorage.getItem("token") === null
      ) {
        localStorage.removeItem("token"); // remove token from local storage
        localStorage.removeItem("username"); // remove user data from local storage
        if (window.location.pathname !== "/") {
          window.location.pathname = "/";
        }
      }

      if (error.response.data.Message) {
        throw error.response.data.Message;
      } else {
        throw error.response.data;
      }
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

export const putRequest = (url: string, hasHeaders: boolean, data: any) => {
  const token = fetchToken();
  return Axios.put(
    `${SERVER_URL}${url}`,
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
      : undefined
  });
};
