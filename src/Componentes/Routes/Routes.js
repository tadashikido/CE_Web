import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../Login/Login";
import Logout from "../Login/Logout";
import Home from "../Home/Home";
import Extrato from "../Extrato/Extrato";
import NewLancamento from "../Lancamento/NewLancamento";
import PrivateRoute from "./PrivateRoute";
import Menu from "./Menu";
import { isAuthenticated } from "../Login/auth";

export default class Routes extends React.Component {
  state = {
    menuVisible: isAuthenticated()
  };

  setMenuVisible = visible => {
    this.setState({
      menuVisible: visible
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Menu menuVisible={this.state.menuVisible} />
        <Switch>
          <Route
            path="/login"
            component={() => <Login setMenuVisible={this.setMenuVisible} />}
          />
          <PrivateRoute exact path="/" comp={() => <Home />} />
          <PrivateRoute path="/extrato" comp={() => <Extrato />} />
          <PrivateRoute path="/lancamento" comp={() => <NewLancamento />} />
          <PrivateRoute
            path="/logout"
            comp={() => <Logout setMenuVisible={this.setMenuVisible} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
