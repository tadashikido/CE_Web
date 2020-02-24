import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

import ExtratoLancamentos from "./ExtratoLancamentos";
import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";

import "react-datepicker/dist/react-datepicker.css";
import "./Extrato.css";

export default class Extrato extends React.Component {
  state = {
    carteiras: [],
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
    carteiraId: 0,
    saldoAnterior: 0,
    lancamentos: [],
    saldoAcumulado: 0,
    isLoading: false,
    error: false
  };

  handlerStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  handlerEndDate = date => {
    this.setState({
      endDate: date
    });
  };

  handlerChangeCarteira = event => {
    this.setState({
      carteiraId: event.target.value
    });
  };

  handlerClick = () => {
    this.carregaExtrato();
  };

  carregaExtrato() {
    this.setState({
      isLoading: true,
      error: false
    });
    fetch(
      API_PATH +
        "/api/saldosInicialCarteira?idCarteira=" +
        this.state.carteiraId +
        "&data=" +
        this.state.startDate.toISOString(),
      {
        method: "GET",
        headers: getAuthentication()
      }
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          saldoAnterior: res
        });
        fetch(
          API_PATH +
            "/api/extrato?idCarteira=" +
            this.state.carteiraId +
            "&dtInicio=" +
            this.state.startDate.toISOString() +
            "&dtFim=" +
            this.state.endDate.toISOString(),
          {
            method: "GET",
            headers: getAuthentication()
          }
        )
          .then(res => res.json())
          .then(res => {
            if (!res.message)
              this.setState({
                lancamentos: res
              });
          });
      })
      .catch(() => {
        this.setState({
          error: true
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  carregaCarteiras = () => {
    fetch(API_PATH + "/api/carteiras?res=EXTRATOS", {
      method: "GET",
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

        this.carregaExtrato();
      })
      .catch(() => {
        this.setState({
          error: true
        });
      });
  };

  async componentDidMount() {
    this.carregaCarteiras();
  }

  render() {
    const {
      startDate,
      endDate,
      carteiraId,
      isLoading,
      error,
      saldoAnterior,
      lancamentos
    } = this.state;

    registerLocale("pt-BR", ptbr);

    return (
      <div className="extrato">
        <div className="parameters">
          <div className="control">
            <label>Data Inicial: </label>
            <DatePicker
              className="input"
              locale="pt-BR"
              selected={startDate}
              onChange={this.handlerStartDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="control">
            <label>Data Final: </label>
            <DatePicker
              className="input"
              locale="pt-BR"
              selected={endDate}
              onChange={this.handlerEndDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="control">
            <label>Carteira: </label>
            <select
              className="input"
              onChange={this.handlerChangeCarteira}
              value={carteiraId}
            >
              {this.state.carteiras.map(carteira => (
                <option key={carteira.id} value={carteira.id}>
                  {carteira.descrCarteira}
                </option>
              ))}
            </select>
          </div>
          <button onClick={this.handlerClick}>Pesquisar</button>
        </div>
        <ExtratoLancamentos
          isLoading={isLoading}
          error={error}
          lancamentos={lancamentos}
          saldoAnterior={saldoAnterior}
        />
      </div>
    );
  }
}
