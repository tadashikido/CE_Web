import React from "react";
import { Redirect } from "react-router-dom";

import { clearStorage } from "./auth";

import "./Login.css";

export default class Login extends React.Component {
  componentDidMount = () => {
    const { setMenuVisible } = this.props;
    setMenuVisible(false);
    clearStorage();
  };

  render() {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}
