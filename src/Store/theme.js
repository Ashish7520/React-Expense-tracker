import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDarkTheme: false };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const themeAction = themeSlice.actions;

export default themeSlice.reducer;
