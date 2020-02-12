import React from "react";

import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

export default class Menu extends React.Component {
  render() {
    return (
      isAuthenticated() && (
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/extrato">Extrato</Link>
        </div>
      )
    );
  }
}
