import React from "react";
import { Home, AttachMoney } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { isAuthenticated } from "../Login/auth";

import "./Menu.css";

export default class Menu extends React.Component {
  render() {
    return (
      isAuthenticated() && (
        <div className="menu">
          <Link className="menu-item" to="/">
            <div className="icon">
              <Home className="ico"/>
              <span>Home</span>
            </div>
          </Link>
          <Link className="menu-item" to="/extrato">
            <div className="icon">
              <AttachMoney className="ico"/>
              <span>Extrato</span>
            </div>
          </Link>
        </div>
      )
    );
  }
}
