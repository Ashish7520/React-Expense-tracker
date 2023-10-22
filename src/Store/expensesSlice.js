// expensesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
  showActivatePremiumButton: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      const totalAmount = state.expenses.reduce((total, expense) => {
        return total + parseFloat(expense.Amount);
      }, 0);
      if (totalAmount > 10000) {
        state.showActivatePremiumButton = true;
      } else {
        state.showActivatePremiumButton = false;
      }
    },
  },
});

export const expenseActions = expensesSlice.actions;

export default expensesSlice.reducer;
