import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchWrapper } from "../services";
import { Auth } from "../models/auth";
import { history } from "../utils";

// create slice

const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

function createInitialState() {
  return {
    // initialize state from local storage to enable user to stay logged in
    value: localStorage.getItem("auth") ?? "",
  };
}

function createReducers() {
  return {
    setAuth,
  };

  function setAuth(state: any, action: any) {
    state.value = action.payload;
  }
}

function createExtraActions() {
  return {
    login: login(),
    logout: logout(),
  };

  function login() {
    return createAsyncThunk(
      `${name}/login`,
      async function ({ username, password }: Auth, { dispatch }) {
        try {
          const token = await fetchWrapper.post("/auth/login", {
            username,
            password,
          });

          // set auth user in redux state
          dispatch(authActions.setAuth(token.access_token));

          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("auth", token.access_token);

          // get return url from location state or default to home page
          const { from } = history?.location?.state ?? {
            from: { pathname: "/" },
          };


          if (history.navigate) history.navigate(from);
        } catch (error) {
          console.log(error);
        }
      }
    );
  }

  function logout() {
    return createAsyncThunk(`${name}/logout`, function (arg, { dispatch }) {
      dispatch(authActions.setAuth(undefined));
      localStorage.removeItem("auth");
      if (history.navigate) history.navigate("/login");
    });
  }
}
