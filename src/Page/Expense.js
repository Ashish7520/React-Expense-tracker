import AddExpense from "../components/AddExpense";
import classes from "./Expense.module.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Expense = (props) => {
  const isVarified = localStorage.getItem("varified");
  const userIdToken = localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-df0a0-default-rtdb.firebaseio.com/expenses.json"
        );
        if (!response.ok) {
          const err = await response.json();
          console.log(err);
          throw new Error(err.message);
        }
        const data = await response.json();
        const expense = Object.values(data);
        setExpenses(expense);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  const emailVarificationHandler = async () => {
    if (!isVarified) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBoBXNkMGpAjlmbpsHLZ0Q0zTjUTJJe3QA",
          {
            method: "POST",
            body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
              idToken: userIdToken,
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
        localStorage.setItem("varified", true);
        console.log("email sent", data);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      return;
    }
  };
  const history = useHistory();
  const completeProfileHandler = () => {
    history.replace("/complete-profile");
  };

  const expenseHandler = (newExpense) => {
    console.log(newExpense, "inside expense ");
    setExpenses((prevExpense) => {
      return [...prevExpense, newExpense];
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>Welcome to Expense Tracker</div>
      <div className={classes.completeProfile} onClick={completeProfileHandler}>
        Complete your profile
      </div>
      <div onClick={emailVarificationHandler}>
        {isVarified ? "" : "Verify your email"}
      </div>
      <AddExpense expense={expenseHandler} />
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            Amount: {expense.Amount}
            Description: {expense.Descreption}
            Category: {expense.Catagory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
