import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowExpense = (props) => {
  const token = localStorage.getItem('userId');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState(true);

  function deleteHandler(id, e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/delete/${id}`, { headers: { "Authorization": token } })
      .then(() => {
        alert("Deleted");
        setChanges(!changes);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:4000/showexpense", { headers: { "Authorization": token } })
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
        <div className="flex ml-9">
          <table>
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
    </div>
  );
};

export default ShowExpense;
