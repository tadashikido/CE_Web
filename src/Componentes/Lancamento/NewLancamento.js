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
    error: false
  };

  handlerReceitaClick = () => {
    this.setState({
      receita: true,
      despesa: false,
      transferencia: false,
      error: false
    });

    fetch(API_PATH + "/api/GetCarteiras?res=ENTRADAS", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            carteiras: res,
            carteiraId: res.length > 0 ? res[0].id : 0
          });
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

    fetch(API_PATH + "/api/GetCarteiras?res=SAIDAS", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            carteiras: res,
            carteiraId: res.length > 0 ? res[0].id : 0
          });
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

    fetch(API_PATH + "/api/GetCarteiras?res=TRANSFER", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            carteiras: res,
            carteiraId: res.length > 0 ? res[0].id : 0
          });
        }
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
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
              valor={this.state.valor}
              onChangeValue={this.handlerChangeValor}
              dataMovimento={this.state.dataMovimento}
              carteiraId={this.state.carteiraId}
            />
          )}
          {despesa && (
            <NewDespesa
              valor={this.state.valor}
              onChangeValue={this.handlerChangeValor}
              dataMovimento={this.state.dataMovimento}
              carteiraId={this.state.carteiraId}
            />
          )}
          {transferencia && (
            <NewTransferencia
              valor={this.state.valor}
              onChangeValue={this.handlerChangeValor}
              dataMovimento={this.state.dataMovimento}
              carteiraId={this.state.carteiraId}
            />
          )}
        </div>
      </div>
    );
  }
}
