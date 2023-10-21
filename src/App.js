import React from "react";
import SignUp from "./Page/Sign-Up";
import { Route } from "react-router-dom";
import Expense from "./Page/Expense";
import classes from "./App.module.css";
import CompleteProfile from "./Page/CompleteProfile";
import Navbar from "./components/Navbar";
import ForgotPassword from "./Page/ForgotPassword";

function App() {
  return (
    <div>
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
