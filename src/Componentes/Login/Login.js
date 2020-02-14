import React from "react";
import { Redirect } from "react-router-dom";
import { Person, Lock, AccountTree } from "@material-ui/icons";
import md5 from "md5";

import { API_PATH } from "../api";
import { isAuthenticated, saveAccessToken, saveAuthentication } from "./auth";

import "./Login.css";

export default class Login extends React.Component {
  state = {
    user: "",
    password: "",
    esquema: "",
    erro: ""
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
    const { setMenuVisible } = this.props;

    e.preventDefault();

    this.setState({
      erro: ""
    });

    if (!this.state.user) {
      this.setState({
        erro: "Digite seu usuário!"
      });
      return;
    }

    if (!this.state.password) {
      this.setState({
        erro: "Digite sua senha!"
      });
      return;
    }

    if (!this.state.esquema) {
      this.setState({
        erro: "Digite o esquema!"
      });
      return;
    }

    fetch(
      API_PATH +
        "/api/Autenticar?user=" +
        this.state.user +
        "&password=" +
        md5(this.state.password) +
        "&schema=" +
        this.state.esquema
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (!res)
          this.setState({
            erro: "Usuário ou senha inválido!"
          });
        else if (res.message) {
          this.setState({
            erro: "Erro ao conetar ao servidor!"
          });
        } else {
          const userId = res.id;

          saveAuthentication({
            user: this.state.user,
            password: md5(this.state.password),
            schema: this.state.esquema,
            userId: userId
          });

          saveAccessToken(res.id);
          setMenuVisible(true);
        }
      });
  };

  render() {
    const { user, password, esquema, erro } = this.state;

    return isAuthenticated() ? (
      <Redirect to={{ pathname: "/" }} />
    ) : (
      <form className="login-form">
        <div className="form-control">
          <label>
            <Person className="login-icon" />
            Usuário
          </label>
          <input type="text" value={user} onChange={this.handlerChangeUser} />
        </div>
        <div className="form-control">
          <label>
            <Lock className="login-icon" />
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={this.handlerChangePassword}
          />
        </div>
        <div className="form-control">
          <label>
            <AccountTree className="login-icon" />
            Esquema
          </label>
          <input
            className="upper"
            type="text"
            value={esquema}
            onChange={this.handlerChangeEsquema}
          />
        </div>
        <div className="erro">{erro}</div>
        <button onClick={this.handlerClick}>Conectar</button>
      </form>
    );
  }
}
