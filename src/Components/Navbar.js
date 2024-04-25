import axios from "axios";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const token = localStorage.getItem("userId");
  const [premiumuser, setPremiumUser] = useState(false);
  const [changepremium , setChangePremium] = useState(false);

  async function premiumHandler(e) {
    e.preventDefault();

    let response = await axios.get("http://localhost:4000/premiummembership", {
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
          "http://localhost:4000/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
        alert("you are premium user now ");
        setChangePremium(!changepremium)
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
          "http://localhost:4000/failedtransactionstatus",
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
    axios
      .get("http://localhost:4000/checkpremium", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log('check premium',res.data);
        setPremiumUser(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changepremium]);
  return (
    <div className="navbar bg-base-100">
      {!premiumuser && <button
        onClick={premiumHandler}
        className="btn btn-ghost border-2 text-xl"
      >
        Premium
      </button>}
    </div>
  );
};

export default Navbar;
