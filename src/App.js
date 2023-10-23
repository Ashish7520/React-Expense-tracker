import React, { useEffect } from "react";
import SignUp from "./Page/Sign-Up";
import { Route, Redirect } from "react-router-dom";
import Expense from "./Page/Expense";
import classes from "./App.module.css";
import CompleteProfile from "./Page/CompleteProfile";
import Navbar from "./components/Navbar";
import ForgotPassword from "./Page/ForgotPassword";
import { useSelector } from "react-redux";

let initialRendering = true;

function App() {
  const expense = useSelector((state) => state.expenses.expenses);
  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);

  useEffect(() => {
    if (initialRendering) {
      initialRendering = false;
      return;
    }

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

  const themeClass = isDarkTheme ? classes.darkStyles : classes.lightStyles;

  return (
    <div className={`${classes.container} ${themeClass}`}>
      <Navbar />
      <main className={classes.main}>
        {isLogin ? (
          <Route path="/expense">
            <Expense />
          </Route>
        ) : (
          <Redirect to="/user" />
        )}
        {!isLogin ? (
          <Route path="/user">
            <SignUp />
          </Route>
        ) : (
          <Redirect to="/expense" />
        )}
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
