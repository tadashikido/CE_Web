import React, { Component } from "react";

import Routes from "./Routes/Routes";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Routes />
      </div>
    );
  }
}
