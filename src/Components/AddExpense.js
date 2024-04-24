import axios from "axios";
import React, { useRef, useState } from "react";
import ShowExpense from "./ShowExpense";

const AddExpense = (props) => {
  const [changeddata , setChangedData]=useState(false);
  const amount = useRef();
  const description = useRef();
  const category = useRef();

  function addExpenseHandler(e) {
    const token = localStorage.getItem('userId')
    const data = {
      amount: amount.current.value,
      description: description.current.value,
      category: category.current.value,
    };
    e.preventDefault();
    axios
      .post("http://localhost:4000/expense", data ,{headers : {"Authorization": token}})
      .then((result) => {
        alert("data added");
        setChangedData(!changeddata);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="mr-10">
      <div className="border-2 border-black p-5 m-10 flex justify-center ">
        <form onSubmit={addExpenseHandler}>
          <label>Choose Expense Amount:</label>
          <input
            type="number"
            className="border-2 border-black px-3 "
            ref={amount}
          />
          <label>Choose Description:</label>
          <input
            type="text"
            className="border-2 border-black px-3"
            ref={description}
          />
          <label>Choose Category:</label>
          <select className="border-2 border-black px-3" ref={category}>
            <option>Fuel</option>
            <option>Food</option>
            <option>Electricity</option>
            <option>Movie</option>
          </select>
          <button
            className="bg-orange-500 border-2 px-2 py-1 m-3 "
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <ShowExpense changedData={changeddata}/>
    </div>
  );
};
export default AddExpense;
