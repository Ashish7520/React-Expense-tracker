import classes from "./AddExpense.module.css";
import React, { useRef } from "react";

const AddExpense = (props) => {
  const inputAmountRef = useRef();
  const inputDesRef = useRef();
  const inputCatRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();

    const enteredAmount = inputAmountRef.current.value;
    const enteredDescreption = inputDesRef.current.value;
    const enteredCatagory = inputCatRef.current.value;

    props.expense({
      Amount: enteredAmount,
      Descreption: enteredDescreption,
      Catagory: enteredCatagory,
    });

    inputAmountRef.current.value = "";
    inputCatRef.current.value = "";
    inputDesRef.current.value = "";
  };
  return (
    <>
      <form onSubmit={formHandler}>
        <label htmlFor="price">Amount spent</label>
        <input
          type="number"
          id="price"
          min={0.0}
          step="0.1"
          ref={inputAmountRef}
        />
        <label htmlFor="descreption">Descreption</label>
        <input type="text" id="descreption" ref={inputDesRef} />
        <label>Catagoty</label>
        <select ref={inputCatRef}>
          <option>Food</option>
          <option>Fuel</option>
          <option>Glocery</option>
          <option>Hospital</option>
          <option>Movie</option>
          <option>Other Expenses</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </>
  );
};

export default AddExpense;
