import expensesReducer from "./expensesSlice";
import authReducer from "./Auth";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { expenses: expensesReducer, auth: authReducer },
});

export default store;
