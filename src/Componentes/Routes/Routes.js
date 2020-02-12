import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../Login/Login";
import Home from "../Home/Home";
import Extrato from "../Extrato/Extrato";
import PrivateRoute from "./PrivateRoute";
import Menu from "./Menu";

const Routes = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route path="/login" component={() => <Login />} />
      <PrivateRoute exact path="/" comp={() => <Home />} />
      <PrivateRoute path="/extrato" comp={() => <Extrato />} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
