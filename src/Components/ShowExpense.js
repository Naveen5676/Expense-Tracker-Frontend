import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ExpenseContext from "../store/expenseContent";

const ShowExpense = (props) => {
  const token = localStorage.getItem("userId");
  const expensectx = useContext(ExpenseContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState(true);

  function deleteHandler(id, e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/delete/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        alert("Deleted");
        setChanges(!changes);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:4000/showexpense", {
          headers: { Authorization: token },
        })
        .then((result) => {
          //console.log(result.data);
          setData(result.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false); // Update loading state even on error
        });
    } else {
      setLoading(false); // Update loading state when token is not available
    }
  }, [props.changedData, changes, token]);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : data.length > 0 ? (
        <div className="flex justify-center ml-9">
          <table className="table-auto md:border-separate border-collapse border-spacing-16">
            <thead>
              <tr>
                <th>Expense Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((info) => (
                <tr key={info.id}>
                  <td>{info.expenseamt}</td>
                  <td>{info.description}</td>
                  <td>{info.category}</td>
                  <td>
                    <button
                      className="border-2 border-black p-2 bg-zinc-700 text-white"
                      onClick={(e) => deleteHandler(info.id, e)}
                    >
                      Delete Expense
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Data Found</div>
      )}
      {expensectx.leaderBoarddata.length > 0 &&
        <div>
          <h1 className="text-center mb-3">Leader Ship Board</h1>
          <div className="flex justify-center">
            <table className="table-auto border-black bg-gray-200 border-collapse border-spacing-10 mb-10">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2">Name</th>
                  <th className="border border-black px-4 py-2">Expenses</th>
                </tr>
              </thead>
              <tbody>
                {expensectx.leaderBoarddata.map((data, index) => (
                  <tr key={index} className="border border-black">
                    <td className="border border-black px-4 py-2">
                      name :{data.name}
                    </td>
                    <td className="border border-black px-4 py-2">
<<<<<<< HEAD
                      total Expense {data.totalexpense}
=======
                      total Expense {data.total_cost}
>>>>>>> 6071d2eaccc2548aab16f4b2b8f492dd93434c33
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
};

export default ShowExpense;
