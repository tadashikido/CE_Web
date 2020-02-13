import React from "react";
import { Redirect } from "react-router-dom";

import { API_PATH } from "../api";
import { isAuthenticated, saveAccessToken } from "./auth";

import "./Login.css";

export default class Login extends React.Component {
  state = {
    user: "",
    password: "",
    esquema: ""
  };

  handlerChangeUser = e => {
    this.setState({
      user: e.target.value
    });
  };

  handlerChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handlerChangeEsquema = e => {
    this.setState({
      esquema: e.target.value
    });
  };

  handlerClick = e => {
    e.preventDefault();
    // fetch(
    //   API_PATH +
    //     "/api/Conectar" +
    //     {
    //       method: "POST",
    //       body: JSON.stringfy({
    //         schema: this.state.esquema,
    //         user: this.state.user,
    //         password: this.state.password
    //       }),
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     }
    // )
    // .then(res => res.json())
    // .then(res => {
    //   this.setState({
    //     saldosTipoCarteira: res
    //   });
    // });
    saveAccessToken("a");
    this.setState({
      password: ""
    });
  };

  render() {
    const { user, password, esquema } = this.state;
    return isAuthenticated() ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <form className="login-form">
        <div className="form-control">
          <label>Usuário</label>
          <input type="text" value={user} onChange={this.handlerChangeUser} />
        </div>
        <div className="form-control">
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={this.handlerChangePassword}
          />
        </div>
        <div className="form-control">
          <label>Esquema</label>
          <input
            type="text"
            value={esquema}
            onChange={this.handlerChangeEsquema}
          />
        </div>
        <button onClick={this.handlerClick}>Conectar</button>
      </form>
    );
  }
}
