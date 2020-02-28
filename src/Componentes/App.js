import React, { Component } from "react";
import { Provider } from "react-redux";

import Routes from "./Routes/Routes";

import store from "../Store";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Provider store={store}>
          <Routes />
        </Provider>
      </div>
    );
  }
}
