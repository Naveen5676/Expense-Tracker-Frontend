import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowExpense = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chages , setChanges] = useState(true);

  function deleteHandler(id, e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/delete/${id}`)
      .then(() => {
        alert("deleted");
        setChanges(!chages);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios.get("http://localhost:4000/showexpense").then((result) => {
      console.log(result.data);
      setData(result.data);
      setLoading(false);
    });
  }, [props.changedData ,chages ]);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : data ? (
        <div className="flex flex-col ml-9">
          {data.map((info, index) => (
            <div
              key={index}
              className="p-5 flex justify-evenly items-center border-2 bg-slate-500 mr-20 ml-10 text-white text-xl "
            >
              <span>{info.category}</span>
              <span>{info.description}</span>
              <span>{info.expenseamt}</span>
              <button
                className="border-2 border-black p-2 bg-zinc-700 text-white"
                onClick={(e) => {
                  deleteHandler(info.id, e);
                }}
              >
                Delete Expense
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h1>no data</h1>
      )}
    </div>
  );
};

export default ShowExpense;
