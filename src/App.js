import React, { useEffect } from "react";
import SignUp from "./Page/Sign-Up";
import { Route } from "react-router-dom";
import Expense from "./Page/Expense";
import classes from "./App.module.css";
import CompleteProfile from "./Page/CompleteProfile";
import Navbar from "./components/Navbar";
import ForgotPassword from "./Page/ForgotPassword";
import { useSelector } from "react-redux";

function App() {
  const expense = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    fetch(
      "https://expense-tracker-df0a0-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "PUT",
        body: JSON.stringify(expense),
      }
    );
  }, [expense]);

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  console.log(isDarkTheme, "inside app js file");
  const themestyle = isDarkTheme ? classes.darkStyles : classes.lightStyles;
  console.log(themestyle);
  return (
    <div className={themestyle}>
      <Navbar />
      <main className={classes.main}>
        <Route path="/expense">
          <Expense />
        </Route>
        <Route path="/user">
          <SignUp />
        </Route>
        <Route path="/complete-profile">
          <CompleteProfile />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
      </main>
    </div>
  );
}

export default App;
