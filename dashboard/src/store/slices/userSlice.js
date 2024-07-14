import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state.user;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/user/logout", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
