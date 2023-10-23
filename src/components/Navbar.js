import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../Store/AuthCtx";
import classes from "./Navbar.module.css";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../Store/Auth";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const isLogin = useSelector((state) => state.auth.isLogin);
  console.log(isLogin);

  const logoutHandler = () => {
    dispatch(logout());
    history.replace("/user");
  };

  return (
    <div className={classes.navbarDiv}>
      {isLogin && (
        <h3 onClick={logoutHandler} className={classes.top}>
          Logout
        </h3>
      )}
    </div>
  );
};

export default Navbar;
