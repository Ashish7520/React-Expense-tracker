import classes from "./AddExpense.module.css";
import React, { useRef } from "react";
import { expenseActions } from "../Store/expensesSlice";
import { useDispatch } from "react-redux";

const AddExpense = (props) => {
  const inputAmountRef = useRef();
  const inputDesRef = useRef();
  const inputCatRef = useRef();

  const dispatch = useDispatch();

  const formHandler = async (e) => {
    e.preventDefault();

    const enteredAmount = inputAmountRef.current.value;
    const enteredDescreption = inputDesRef.current.value;
    const enteredCatagory = inputCatRef.current.value;

    if (props.onEdit) {
      const updatedExpense = {
        id: props.onEdit.id,
        Amount: enteredAmount,
        Descreption: enteredDescreption,
        Catagory: enteredCatagory,
      };
      dispatch(expenseActions.editExpense(updatedExpense));
    } else {
      const id = Math.floor(Math.random() * 1000);
      try {
        dispatch(
          expenseActions.addExpense({
            Amount: enteredAmount,
            Descreption: enteredDescreption,
            Catagory: enteredCatagory,
            id: id,
          })
        );
      } catch (error) {
        console.log(error.message);
      }

      inputAmountRef.current.value = "";
      inputCatRef.current.value = "";
      inputDesRef.current.value = "";
    }
    inputAmountRef.current.value = "";
    inputCatRef.current.value = "";
    inputDesRef.current.value = "";
  };

  if (props.onEdit) {
    inputAmountRef.current.value = props.onEdit.Amount;
    inputCatRef.current.value = props.onEdit.Catagory;
    inputDesRef.current.value = props.onEdit.Descreption;
  }
  return (
    <div className={classes.centeredContainer}>
      <div className={classes.card}>
        <form onSubmit={formHandler}>
          <label htmlFor="price">Amount spent</label>
          <input
            type="number"
            id="price"
            min={0.0}
            step="0.1"
            ref={inputAmountRef}
          />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" ref={inputDesRef} />
          <label>Category</label>
          <select ref={inputCatRef}>
            <option>Food</option>
            <option>Fuel</option>
            <option>Grocery</option>
            <option>Hospital</option>
            <option>Movie</option>
            <option>Other Expenses</option>
          </select>
          <button type="submit">
            {props.onEdit ? "Edit Expense" : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
