import React from "react";
import { Redirect } from "react-router-dom";

import { removeAccessToken } from "./auth";

import "./Login.css";

export default class Login extends React.Component {
  componentDidMount = () => {
    removeAccessToken();
  };

  render() {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}
