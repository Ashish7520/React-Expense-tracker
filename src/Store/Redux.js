import expensesReducer from "./expensesSlice";
import authReducer from "./Auth";
import themeReducer from "./theme";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;
