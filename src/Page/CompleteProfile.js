import classes from "./CompleteProfile.module.css";

import git from "../Assets/github.png";
import web from "../Assets/web.png";
import React, { useRef, useEffect } from "react";

const CompleteProfile = (props) => {
  const inputNameRef = useRef();
  const inputUrlRef = useRef();

  useEffect(async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-df0a0-default-rtdb.firebaseio.com/user.json"
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const key = Object.keys(data);
        console.log(key);
      } else {
        const err = await response.json();
        throw new Error(err);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredUrl = inputUrlRef.current.value;

    if (enteredName && enteredUrl) {
      console.log(process.env.REACT_APP_POST_USERDETAILS, "sahi hai");
      try {
        const response = await fetch(
          "https://expense-tracker-df0a0-default-rtdb.firebaseio.com/user.json",
          {
            method: "POST",
            body: JSON.stringify({
              name: enteredName,
              profile: enteredUrl,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const err = await response.json();
          console.log(err);
          throw new Error(err);
        }

        const data = await response.json();
        localStorage.setItem("id", data.name);
      } catch (error) {
        console.log(error);
      }
      console.log(enteredName, enteredUrl);
    }

    inputNameRef.current.value = "";
    inputUrlRef.current.value = "";
  };

  const CancleBtnHandler = () => {
    inputNameRef.current.value = "";
    inputUrlRef.current.value = "";
  };

  return (
    <>
      <div className={classes.quotes}>Winner never quit, Quitter never win</div>
      <div className={classes.completeProfile}>Complete your profile</div>
      <div className={classes.outerDiv}>
        <div className={classes.title}>Contact details</div>
        <form onSubmit={formHandler}>
          <div>
            <img src={git} alt="git logo" />
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={inputNameRef} />
          </div>
          <div>
            <img src={web} alt="web logo" />
            <label htmlFor="url">Profile Url</label>
            <input type="url" id="url" ref={inputUrlRef} />
          </div>
          <button onClick={CancleBtnHandler}>Cancel</button>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default CompleteProfile;
