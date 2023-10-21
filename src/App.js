import React from "react";
import SignUp from "./Page/Sign-Up";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <main>
        <Route path="/home">
          <h1>Hello Home</h1>
        </Route>
        <Route path="/user">
          <SignUp />
        </Route>
      </main>
    </div>
  );
}

export default App;
