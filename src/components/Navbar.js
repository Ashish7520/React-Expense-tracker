import AuthContext from "../Store/AuthCtx";
import classes from "./Navbar.module.css";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    AuthCtx.logout();
    history.replace("/user");
  };

  return (
    <>
      <h3 onClick={logoutHandler} className={classes.top}>
        Logout
      </h3>
    </>
  );
};

export default Navbar;
