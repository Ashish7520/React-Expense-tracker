// expensesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

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
    editExpense: (state, action) => {
      const { id, Amount, Descreption, Catagory } = action.payload;
      const expenseToEdit = state.expenses.find((expense) => expense.id === id);

      if (expenseToEdit) {
        expenseToEdit.Amount = Amount;
        expenseToEdit.Descreption = Descreption;
        expenseToEdit.Catagory = Catagory;
      }
    },

    deleteExpense: (state, action) => {
      const { id } = action.payload;
      state.expenses = state.expenses.filter((item) => item.id != id);
    },
  },
});

export const expenseActions = expensesSlice.actions;

export default expensesSlice.reducer;
