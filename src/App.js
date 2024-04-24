import React, { Fragment } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Switch , Redirect } from "react-router-dom";
import AddExpense from "./Components/AddExpense";

function App() {
  return (
    <Fragment >
      <div>

      
      <Switch>
        <Route path='/' exact>
          <Redirect  to='/login'/>
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/expense'>
          <AddExpense/>
        </Route>
      </Switch>
      </div>
    </Fragment>
  );
}

export default App;
