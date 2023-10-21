import classes from "./ForgotPassword.module.css";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

const ForgotPassword = (props) => {
  const inputEmailRef = useRef();
  const history = useHistory();

  const formHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBoBXNkMGpAjlmbpsHLZ0Q0zTjUTJJe3QA",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.log(err);
        throw new Error(err.message);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
    console.log(enteredEmail);

    inputEmailRef.current.value = "";
  };

  const loginHandler = () => {
    history.replace("/user");
  };
  return (
    <>
      <form onSubmit={formHandler}>
        <label htmlFor="email">
          Enter the email with which you have registered{" "}
        </label>
        <input id="email" type="email" ref={inputEmailRef} />
        <button type="submit">Send link</button>
        <div onClick={loginHandler}>Already user? Login</div>
      </form>
    </>
  );
};

export default ForgotPassword;
