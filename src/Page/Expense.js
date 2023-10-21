import classes from "./Expense.module.css";
import { useHistory } from "react-router-dom";

const Expense = (props) => {
  const history = useHistory();
  const completeProfileHandler = () => {
    history.replace("/complete-profile");
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>Welcome to Expense Tracker</div>
      <div className={classes.completeProfile} onClick={completeProfileHandler}>
        Complete your profile
      </div>
    </div>
  );
};

export default Expense;
