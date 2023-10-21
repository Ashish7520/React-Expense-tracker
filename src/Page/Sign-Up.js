import React, { useState, useRef } from "react";
import classes from "./Sign-Up.module.css";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const isEmailValid = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailPattern.test(email);
    if (!isValid) {
      alert("Enter Valid Email");
    } else {
      return isValid;
    }
  };

  const isPasswordValid = (password) => {
    if (password.length < 6) {
      alert("Password Must be 6 character long");
      return false;
    }

    return true;
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    if (!isEmailValid(enteredEmail) || !isPasswordValid(enteredPassword)) {
      return;
    }

    let url;

    if (!isLogin) {
      url = process.env.REACT_APP_SIGNUP;
    } else {
      url = process.env.REACT_APP_LOGIN;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        const err = await response.json();
        console.log(err.error.message);
        throw new Error(err.error.message); // Throw the error message
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error.message);
      console.log(error.message); // Access the error message
    }

    console.log(enteredEmail, enteredPassword);
    inputEmailRef.current.value = "";
    inputPasswordRef.current.value = "";
  };

  const toglerHander = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <form className={classes.formDiv} onSubmit={formHandler}>
        <div className={classes.heading}>{isLogin ? "Login" : "SignUp"}</div>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" ref={inputEmailRef} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={inputPasswordRef} />
        <button type="submit" disabled={!isEmailValid || !isPasswordValid}>
          {isLogin ? "Login" : "SignUp"}
        </button>
        <div className={classes.custom} onClick={toglerHander}>
          {isLogin ? "New User - Signup" : "Existing User - Login"}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
