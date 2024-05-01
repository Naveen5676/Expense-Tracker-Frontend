import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ExpenseContext from "../store/expenseContent";

const Navbar = () => {
  const expensectx = useContext(ExpenseContext);
  const token = localStorage.getItem("userId");
  const [premiumuser, setPremiumUser] = useState(false);
  const [changepremium, setChangePremium] = useState(false);


  async function premiumHandler(e) {
    e.preventDefault();

    let response = await axios.get("http://54.234.47.97/premiummembership", {
      headers: { Authorization: token },
    });
    //console.log(response)
    let options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      //this handler fucntion will handle the success payment
      handler: async function (response) {
        console.log("header====> ", response);
        await axios.post(
          "http://54.234.47.97/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
        alert("you are premium user now ");
        setChangePremium(!changepremium);
        setPremiumUser(true);
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      axios
        .post(
          "http://54.234.47.97/failedtransactionstatus",
          {
            order_id: options.order_id,
          },
          { headers: { Authorization: token } }
        )
        .then(() => {
          alert("payment failed");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  useEffect(() => {
    expensectx.premiumapicall();
    setPremiumUser(expensectx.ispremium);
  }, [changepremium]);

  function leaderBoardHandler(e) {
    e.preventDefault();
    expensectx.leaderBoard();
  }

  function  download(){
    axios.get('http://54.234.47.97/downloadexpense', {headers : {"Authorization" : token}}).then((response)=>{
      if(response.status==200){
        //the bcakend is essentially sending a download link
        //  which if we open in browser, the file would download
        var a = document.createElement("a");
        a.href = response.data.fileURL;
        a.download = 'myexpense.csv';
        a.click()
      }else{
        console.log(response.data.message)
      }
    })
  }

  function geturl(e){
    e.preventDefault()
    expensectx.getoldurl()

  }
  return (
    <div className="navbar bg-amber-300 px-5 py-5">
      {!expensectx.ispremium ? (
        <button 
          onClick={premiumHandler}
          className="btn btn-ghost border-2 text-xl text-white bg-slate-600 hover:bg-gray-800 px-3 py-2 "
        >
          Premium
        </button>
      ) : (
        <div>
          <h2 className="text-xl mb-2">You are premium user now</h2>{" "}
          <button onClick={leaderBoardHandler} className="mr-2 btn btn-ghost border-2 text-md text-white bg-slate-600 hover:bg-gray-800 px-1 py-1">Show LeaderBoard</button>{" "}
          <button onClick={download} className="mr-2 btn btn-ghost border-2 text-md text-white bg-slate-600 hover:bg-gray-800 px-1 py-1">Download report </button>{" "}
          <button onClick={geturl} className="btn btn-ghost border-2 text-md text-white bg-slate-600 hover:bg-gray-800 px-1 py-1">Show previous Urls</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
