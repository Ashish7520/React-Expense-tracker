import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/Auth";
import { useHistory } from "react-router-dom";
import classes from "./Sign-Up.module.css";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const authState = useSelector((state) => state.auth);

  const isEmailValid = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailPattern.test(email);
    if (!isValid) {
      alert("Enter a valid email");
    }
    return isValid;
  };

  const isPasswordValid = (password) => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
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
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoBXNkMGpAjlmbpsHLZ0Q0zTjUTJJe3QA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoBXNkMGpAjlmbpsHLZ0Q0zTjUTJJe3QA";
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
        throw new Error(err.error.message);
      }

      const data = await response.json();
      dispatch(login({ token: data.idToken }));

      if (isLogin) {
        history.replace("/expense");
      } else {
        alert("Sign Up Successful");
        setIsLogin(!isLogin);
      }

      console.log(data);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }

    console.log(enteredEmail, enteredPassword);
    inputEmailRef.current.value = "";
    inputPasswordRef.current.value = "";
  };

  const toggleHandler = () => {
    setIsLogin(!isLogin);
  };

  const forgotPasswordHandler = () => {
    history.replace("/forgot-password");
  };

  return (
    <div className={classes.centeredContainer}>
      <form className={classes.formDiv} onSubmit={formHandler}>
        <div className={classes.heading}>{isLogin ? "Login" : "SignUp"}</div>
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" ref={inputEmailRef} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={inputPasswordRef} />
        <button type="submit" disabled={!isEmailValid || !isPasswordValid}>
          {isLogin ? "Login" : "SignUp"}
        </button>
        <div className={classes.custom} onClick={toggleHandler}>
          {isLogin ? "New User - Signup" : "Existing User - Login"}
        </div>
        <div className={classes.custom} onClick={forgotPasswordHandler}>
          {isLogin ? "Forgot Password" : ""}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
