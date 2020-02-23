import React from "react";
import { AttachMoney, MoneyOff, CompareArrows } from "@material-ui/icons";

import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";
import NewReceita from "./NewReceita";
import NewDespesa from "./NewDespesa";
import NewTransferencia from "./NewTransferencia";

import "./NewLancamento.css";

export default class NewLancamento extends React.Component {
  state = {
    receita: false,
    despesa: true,
    transferencia: false,
    carteiras: [],
    valor: 0,
    dataMovimento: new Date(),
    carteiraId: 0,
    obs: "",
    autoLancamentos: [],
    autoLancamentoId: 0,
    error: false
  };

  handlerReceitaClick = () => {
    this.setState({
      receita: true,
      despesa: false,
      transferencia: false,
      error: false
    });

    fetch(API_PATH + "/api/carteiras?res=ENTRADAS", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            carteiras: res,
            carteiraId: this.state.carteiraId
              ? this.state.carteiraId
              : res.length > 0
              ? res[0].id
              : 0
          });
          this.carregaAutosLancamentos();
        }
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  };

  handlerDespesaClick = () => {
    this.setState({
      receita: false,
      despesa: true,
      transferencia: false,
      error: false
    });

    fetch(API_PATH + "/api/carteiras?res=SAIDAS", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            carteiras: res,
            carteiraId: this.state.carteiraId
              ? this.state.carteiraId
              : res.length > 0
              ? res[0].id
              : 0
          });
          this.carregaAutosLancamentos();
        }
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  };

  handlerTransferenciaClick = () => {
    this.setState({
      receita: false,
      despesa: false,
      transferencia: true,
      error: false
    });

    fetch(API_PATH + "/api/carteiras?res=TRANSFER", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            carteiras: res,
            carteiraId: this.state.carteiraId
              ? this.state.carteiraId
              : res.length > 0
              ? res[0].id
              : 0
          });
          this.carregaAutosLancamentos();
        }
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  };

  carregaAutosLancamentos = () => {
    fetch(API_PATH + "/api/autoLancamentos", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            autoLancamentos: res,
            autoLancamentoId: res.length > 0 ? res[0].id : 0
          });
        }
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  };

  handlerChangeValor = e => {
    this.setState({
      valor: e.target.value
    });
  };

  handlerChangeData = date => {
    this.setState({
      dataMovimento: date
    });
  };

  handlerChangeCarteira = e => {
    this.setState({
      carteiraId: e.target.value
    });
  };

  handlerChangeObs = e => {
    this.setState({
      obs: e.target.value.toUpperCase()
    });
  };

  handlerChangeAutoLan = e => {
    this.setState({
      autoLancamentoId: e.target.value
    });
  };

  componentDidMount = () => {
    this.handlerDespesaClick();
  };

  render() {
    const { receita, despesa, transferencia } = this.state;

    return (
      <div className="new-lancamento">
        <div className="controle">
          <span>Selecione:</span>
          <div className="buttons">
            <button
              className={"receita " + (receita ? "activebutton" : "")}
              onClick={this.handlerReceitaClick}
            >
              <AttachMoney />
            </button>
            <button
              className={"despesa " + (despesa ? "activebutton" : "")}
              onClick={this.handlerDespesaClick}
            >
              <MoneyOff />
            </button>
            <button
              className={
                "transferencia " + (transferencia ? "activebutton" : "")
              }
              onClick={this.handlerTransferenciaClick}
            >
              <CompareArrows />
            </button>
          </div>
        </div>
        <div
          className={
            "tipo-lancamento " +
            (this.state.receita
              ? "receita"
              : this.state.despesa
              ? "despesa"
              : "transferencia")
          }
        >
          {receita && (
            <NewReceita
              carteiras={this.state.carteiras}
              valor={this.state.valor}
              dataMovimento={this.state.dataMovimento}
              carteiraId={this.state.carteiraId}
              obs={this.state.obs}
              autoLancamentos={this.state.autoLancamentos}
              autoLancamentoId={this.state.autoLancamentoId}
              onChangeAutoLan={this.handlerChangeAutoLan}
              onChangeValor={this.handlerChangeValor}
              onChangeData={this.handlerChangeData}
              onChangeCarteira={this.handlerChangeCarteira}
              onChangeObs={this.handlerChangeObs}
            />
          )}
          {despesa && (
            <NewDespesa
              carteiras={this.state.carteiras}
              valor={this.state.valor}
              dataMovimento={this.state.dataMovimento}
              carteiraId={this.state.carteiraId}
              obs={this.state.obs}
              autoLancamentos={this.state.autoLancamentos}
              autoLancamentoId={this.state.autoLancamentoId}
              onChangeAutoLan={this.handlerChangeAutoLan}
              onChangeValor={this.handlerChangeValor}
              onChangeData={this.handlerChangeData}
              onChangeCarteira={this.handlerChangeCarteira}
              onChangeObs={this.handlerChangeObs}
            />
          )}
          {transferencia && (
            <NewTransferencia
              carteiras={this.state.carteiras}
              valor={this.state.valor}
              dataMovimento={this.state.dataMovimento}
              carteiraId={this.state.carteiraId}
              obs={this.state.obs}
              autoLancamentos={this.state.autoLancamentos}
              autoLancamentoId={this.state.autoLancamentoId}
              onChangeAutoLan={this.handlerChangeAutoLan}
              onChangeValor={this.handlerChangeValor}
              onChangeData={this.handlerChangeData}
              onChangeCarteira={this.handlerChangeCarteira}
              onChangeObs={this.handlerChangeObs}
            />
          )}
        </div>
      </div>
    );
  }
}
