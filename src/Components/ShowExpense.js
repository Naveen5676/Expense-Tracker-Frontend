import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ExpenseContext from "../store/expenseContent";

const ShowExpense = (props) => {
  const token = localStorage.getItem("userId");
  const expensectx = useContext(ExpenseContext);

  const [data, setData] = useState([]);
  const [pagination , setPagination]=useState();
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState(true);
  

  // useEffect(async () => {
  //   try{
  //   const page = 1
  //   const responsedata = await axios.get(`http://localhost:4000/getexpenses?page=${page}` , {headers: { Authorization: token }})
  //   setData(responsedata.data)
  //   setPagination(responsedata)
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // },[props.changedData, changes, token])

  // async function getProducts(page) {
  //   try {
  //     const responsedata = await axios.get(`http://localhost:4000/getexpenses?page=${page}`, {headers: { Authorization: token }});
  //     setData(responsedata.data);
  //     setPagination(responsedata.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  async function fetchData(page = 1) {
    try {
      const rowsperpage = localStorage.getItem('rowsPerPage')
      const responsedata = await axios.get(`http://localhost:4000/getexpenses?page=${page}&rowsperpage=${rowsperpage}`, {headers: { Authorization: token }});
      setData(responsedata.data);
      setPagination(responsedata.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [props.changedData, changes, token , ]);
  
  async function getProducts(page) {
    await fetchData(page);
  }
  
  

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

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .get("http://localhost:4000/showexpense", {
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
    event.preventDefault()
    const selectedRowsPerPage = event.target.value;
    localStorage.setItem('rowsPerPage', selectedRowsPerPage);
    setChanges(!changes)
  }

  return (
    <div>
      <form onChange={handleRowsChange}>
      <label>Rows per pages</label>
      <select>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      </form>
      {console.log('oldurldata',expensectx.oldurldata)}
      {loading ? (
        <h1>Loading</h1>
      ) : data.products.length > 0 ? (
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
              {data.products.map((info) => (
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
     {data.products  &&
  <div>
    {pagination.hasPrevousPage && <button className="px-2 py-4 "  onClick={() => { getProducts(pagination.previousPage) }}>{pagination.previousPage}</button>}
    <button className="px-2 py-4 " onClick={() => { getProducts(pagination.currentPage) }}>{pagination.currentPage}</button>
    {pagination.hasNextPage && <button onClick={() => { getProducts(pagination.nextPage) }}>{pagination.nextPage}</button>}
  </div>
}

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
                      total Expense {data.totalexpense}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
       {expensectx.oldurldata.length > 0 &&
        <div>
          <h1 className="text-center mb-3">Old Url Table</h1>
          <div className="flex justify-center">
            <table className="table-auto border-black bg-gray-200 border-collapse border-spacing-10 mb-10">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2">uiser id</th>
                  <th className="border border-black px-4 py-2">Link </th>
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
      }
    </div>
  );
};

export default ShowExpense;
