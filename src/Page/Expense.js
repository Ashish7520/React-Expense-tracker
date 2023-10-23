import AddExpense from "../components/AddExpense";
import classes from "./Expense.module.css";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../Store/expensesSlice";
import { themeAction } from "../Store/theme";

const Expense = (props) => {
  const isVarified = localStorage.getItem("varified");
  const userIdToken = localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(null);

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
        expense.map((item) => {
          dispatch(expenseActions.addExpense(item));
        });
        console.log(expense);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  const Expensedata = useSelector((state) => state.expenses.expenses);
  console.log(Expensedata, "this is data");
  const isPremium = useSelector(
    (state) => state.expenses.showActivatePremiumButton
  );

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

  const changeThemeHandler = () => {
    dispatch(themeAction.changeTheme());
  };

  function convertToCSV(expenses) {
    const header = ["Amount", "Category", "Description"];
    const csv = expenses.map((expense) => {
      return [expense.Amount, expense.Catagory, expense.Descreption].join(",");
    });
    return [header.join(","), ...csv].join("\n");
  }

  // Function to trigger the download
  const downloadHandler = (Expensedata) => {
    console.log(Expensedata);
    const csvContent = convertToCSV(Expensedata);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const editHandler = (expense) => {
    setEdit(expense);
    console.log(Expensedata);
    console.log(expense);
  };

  const deleteHandler = (expense) => {
    dispatch(expenseActions.deleteExpense(expense));
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
      <AddExpense expense={expenseHandler} onEdit={edit} />
      {isPremium && (
        <button className={classes.btn1} onClick={changeThemeHandler}>
          Change Theme
        </button>
      )}
      {isPremium && (
        <button
          onClick={() => downloadHandler(Expensedata)}
          className={classes.btn2}
        >
          Download
        </button>
      )}
      <ul>
        {Expensedata.map((expense, index) => (
          <li key={index}>
            {`Amount: ${expense.Amount}    Description: ${expense.Descreption}    Category: ${expense.Catagory}`}
            <button onClick={() => editHandler(expense)}>Edit</button>
            <button onClick={() => deleteHandler(expense)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
