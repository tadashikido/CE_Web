import React from "react";
import { Home, AttachMoney, ExitToApp, AddCircle } from "@material-ui/icons";

import { Link } from "react-router-dom";

import "./Menu.css";

export default class Menu extends React.Component {
  render() {
    const { menuVisible } = this.props;

    return (
      menuVisible && (
        <div className="menu">
          <Link className="menu-item" to="/">
            <div className="icon">
              <Home className="ico" />
              <span>Home</span>
            </div>
          </Link>
          <Link className="menu-item" to="/extrato">
            <div className="icon">
              <AttachMoney className="ico" />
              <span>Extrato</span>
            </div>
          </Link>
          <Link className="menu-item" to="/lancamento">
            <div className="icon">
              <AddCircle className="ico" />
              <span>Novo</span>
            </div>
          </Link>

          <Link className="menu-item logout" to="/logout">
            <div className="icon">
              <ExitToApp className="ico" />
              <span>Sair</span>
            </div>
          </Link>
        </div>
      )
    );
  }
}
