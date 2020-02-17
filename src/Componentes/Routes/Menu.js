import React from "react";
import { Home, AttachMoney, ExitToApp, AddCircle } from "@material-ui/icons";

import { Link } from "react-router-dom";

import "./Menu.css";

export default class Menu extends React.Component {
  state = {
    menuAtivo: "home"
  };

  handlerClick = (e, menu) => {
    this.setState({
      menuAtivo: menu
    });
  };

  render() {
    const { menuVisible } = this.props;
    const { menuAtivo } = this.state;

    return (
      menuVisible && (
        <div className="menu">
          <Link
            className={"menu-item " + (menuAtivo === "home" ? "active" : "")}
            to="/"
            onClick={() => this.handlerClick(this, "home")}
          >
            <div className="icon">
              <Home className="ico" />
              <span>Home</span>
            </div>
          </Link>
          <Link
            className={"menu-item " + (menuAtivo === "extrato" ? "active" : "")}
            to="/extrato"
            onClick={() => this.handlerClick(this, "extrato")}
          >
            <div className="icon">
              <AttachMoney className="ico" />
              <span>Extrato</span>
            </div>
          </Link>
          <Link
            className={
              "menu-item " + (menuAtivo === "lancamento" ? "active" : "")
            }
            to="/lancamento"
            onClick={() => this.handlerClick(this, "lancamento")}
          >
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
