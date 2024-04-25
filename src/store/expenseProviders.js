import React, { useState } from "react";
import ExpenseStore from "./expenseContent";
import axios from "axios";

const ExpenseProvider = (props) => {
    const token = localStorage.getItem("userId");
    const [leaderboarddata, setLeaderboardData] = useState([]);
    const [premiumuser, setPremiumUser] = useState(false);

    const leaderBoardHandler = async () => {
        try {
            const response = await axios.get('http://localhost:4000/showleaderboard');
            setLeaderboardData(response.data); // Assuming response contains the data you need
        } catch (error) {
            console.error("Error fetching leaderboard data:", error);
        }
    };

    const premiumHandler=()=>{
        axios.get("http://localhost:4000/checkpremium", {
        headers: { Authorization: token },
      })
      .then((res) => {
        //console.log('check premium',res.data);
        setPremiumUser(res.data)
      })
      .catch((err) => {
        console.log(err);
      });

    }

    const expensestore = {
        leaderBoarddata: leaderboarddata,
        leaderBoard: leaderBoardHandler,
        ispremium : premiumuser,
        premiumapicall: premiumHandler

    };

    return (
        <ExpenseStore.Provider value={expensestore}>{props.children}</ExpenseStore.Provider>
    );
};

export default ExpenseProvider;
