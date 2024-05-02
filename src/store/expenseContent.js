import React from "react";

const ExpenseStore = React.createContext({
    leaderBoarddata:[],
    leaderBoard:async ()=>{},
    // ispremium:false,
    // premiumapicall:()=>{},
    oldurldata:[],
    getoldurl:()=>{}
})

export default ExpenseStore