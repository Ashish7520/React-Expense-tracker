// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  isLogin: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("token", token);
      state.token = token;
      state.isLogin = true;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = "";
      state.isLogin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
