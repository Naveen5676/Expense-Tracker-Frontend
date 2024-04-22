import React, { Fragment } from "react";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { Route, Switch , Redirect } from "react-router-dom";

function App() {
  return (
    <Fragment>
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
      </Switch>
    </Fragment>
  );
}

export default App;
