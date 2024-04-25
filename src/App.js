import React, { Fragment } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Switch , Redirect , useLocation } from "react-router-dom";
import AddExpense from "./Components/AddExpense";

import Navbar from "./Components/Navbar";

function App() {
  const location = useLocation();
  const excludepaths = ["/login" , "/signup"]
  const isExcludedPath = excludepaths.includes(location.pathname)

  return (
    <Fragment >
      <div>
      {!isExcludedPath && <Navbar />}
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
