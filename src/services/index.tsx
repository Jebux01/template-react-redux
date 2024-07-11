import { RequestOptions } from "../models/requests";
import { store } from "../store";
import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:8000/api/v1" });

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method: string) {
  return async (url: string, body?: Object) => {
    const requestOptions: RequestOptions = {
      method,
      headers: authHeader(),
    };

    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.data = body;
    }

    try {
      const response = await client(url, requestOptions);
      return response.data;
    } catch (error) {
      if (error === "Unauthorized") {
        // auto logout if 401 response returned from api
        console.log("Unauthorized");
      }

      return Promise.reject(error);
    }
  };
}

function authToken() {
  return store.getState().auth.value;
}

function authHeader(): { [key: string]: string } {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = authToken();
  const isLoggedIn = !!token;
  if (!isLoggedIn) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
}
