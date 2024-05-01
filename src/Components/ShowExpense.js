import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ExpenseContext from "../store/expenseContent";

const ShowExpense = (props) => {
  const token = localStorage.getItem("userId");
  const expensectx = useContext(ExpenseContext);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState(true);

  // useEffect(async () => {
  //   try{
  //   const page = 1
  //   const responsedata = await axios.get(`http://54.234.47.97/getexpenses?page=${page}` , {headers: { Authorization: token }})
  //   setData(responsedata.data)
  //   setPagination(responsedata)
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // },[props.changedData, changes, token])

  // async function getProducts(page) {
  //   try {
  //     const responsedata = await axios.get(`http://54.234.47.97/getexpenses?page=${page}`, {headers: { Authorization: token }});
  //     setData(responsedata.data);
  //     setPagination(responsedata.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function fetchData(page = 1) {
    try {
      const rowsperpage = localStorage.getItem("rowsPerPage");
      const responsedata = await axios.get(
        `http://54.234.47.97/getexpenses?page=${page}&rowsperpage=${rowsperpage}`,
        { headers: { Authorization: token } }
      );
      setData(responsedata.data);
      setPagination(responsedata.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [props.changedData, changes, token]);

  async function getProducts(page) {
    await fetchData(page);
  }

  function deleteHandler(id, e) {
    e.preventDefault();
    axios
      .delete(`http://54.234.47.97/delete/${id}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        alert("Deleted");
        setChanges(!changes);
      })
      .catch((err) => console.log(err));
  }

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .get("http://54.234.47.97/showexpense", {
  //         headers: { Authorization: token },
  //       })
  //       .then((result) => {
  //         //console.log(result.data);
  //         setData(result.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setLoading(false); // Update loading state even on error
  //       });
  //   } else {
  //     setLoading(false); // Update loading state when token is not available
  //   }
  // }, [props.changedData, changes, token]);

  function handleRowsChange(event) {
    event.preventDefault();
    const selectedRowsPerPage = event.target.value;
    localStorage.setItem("rowsPerPage", selectedRowsPerPage);
    setChanges(!changes);
  }

  return (
    <div>
      <form
        onChange={handleRowsChange}
        className="ml-10 text-xl text-fuchsia-700"
      >
        <label>Rows per page</label>
        <select className="border border-amber-500 ml-2">
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </form>

      {console.log("oldurldata", expensectx.oldurldata)}
      {loading ? (
        <h1>Loading</h1>
      ) : data.products.length > 0 ? (
        <div className="flex justify-center ml-9">
          <table className="table-auto md:border-separate border-collapse border-spacing-16 border border-black">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2 text-center">
                  Expense Amount
                </th>
                <th className="border border-black px-4 py-2 text-center">
                  Description
                </th>
                <th className="border border-black px-4 py-2 text-center">
                  Category
                </th>
                <th className="border border-black px-4 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((info) => (
                <tr key={info.id} className="border border-black">
                  <td className="border border-black px-4 py-2 text-center">
                    {info.expenseamt}
                  </td>
                  <td className="border border-black px-4 py-2 text-center">
                    {info.description}
                  </td>
                  <td className="border border-black px-4 py-2 text-center">
                    {info.category}
                  </td>
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
      {data.products && (
        <div className="flex justify-center mt-3">
          {pagination.hasPrevousPage && (
            <button
              className=" px-3 py-3 border-2 border-lime-400 m-3  bg-yellow-400"
              onClick={() => {
                getProducts(pagination.previousPage);
              }}
            >
              {pagination.previousPage}
            </button>
          )}
          <button
            className="px-3 py-3 border-2 border-lime-400  m-3 bg-yellow-400"
            onClick={() => {
              getProducts(pagination.currentPage);
            }}
          >
            {pagination.currentPage}
          </button>
          {pagination.hasNextPage && (
            <button
              className="px-3 py-3 border-2 border-lime-400  m-3 bg-yellow-400"
              onClick={() => {
                getProducts(pagination.nextPage);
              }}
            >
              {pagination.nextPage}
            </button>
          )}
        </div>
      )}

      {expensectx.leaderBoarddata.length > 0 && (
        <div>
          <h1 className="text-center mb-5 text-orange-500 text-3xl mt-5">
            Leader Ship Board
          </h1>
          <div className="flex justify-center">
            <table className="table-auto border-black bg-gray-200 border-collapse border-spacing-10 mb-10">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2 text-center">
                    Name
                  </th>
                  <th className="border border-black px-4 py-2 text-center">
                    Expenses
                  </th>
                </tr>
              </thead>
              <tbody>
                {expensectx.leaderBoarddata.map((data, index) => (
                  <tr key={index} className="border border-black">
                    <td className="border border-black px-4 py-2 text-center">
                      {data.name}
                    </td>
                    <td className="border border-black px-4 py-2 text-center">
                      {data.totalexpense}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {expensectx.oldurldata.length > 0 && (
  <div className="flex flex-col items-center">
    <h1 className="text-center mb-5 text-orange-500 text-3xl mt-5">
      Old Url Table
    </h1>
    <div className="overflow-x-auto">
      <table className="table-auto border-black bg-gray-200 border-collapse mb-10 ml-10">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">User ID</th>
            <th className="border border-black px-4 py-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {expensectx.oldurldata.map((data, index) => (
            <tr key={index} className="border border-black">
              <td className="border border-black px-4 py-2">
                {data.userdatumId}
              </td>
              <td className="border border-black px-4 py-2">
                {data.downloadurl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div>
  );
};

export default ShowExpense;
