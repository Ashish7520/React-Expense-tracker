import React from "react";
import SignUp from "./Page/Sign-Up";
import { Route } from "react-router-dom";
import Expense from "./Page/Expense";
import classes from "./App.module.css";
import CompleteProfile from "./Page/CompleteProfile";

function App() {
  return (
    <div>
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
      </main>
    </div>
  );
}

export default App;
