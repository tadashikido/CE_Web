import React from "react";
import DatePicker from "react-datepicker";

import ExtratoLancamentos from "./ExtratoLancamentos";
import { API_PATH } from "../api";

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
        "/api/GetSaldosInicial?schema=TADASHI&idCarteira=" +
        this.state.carteiraId +
        "&data=" +
        this.state.startDate.toISOString()
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          saldoAnterior: res
        });
        fetch(
          API_PATH +
            "/api/GetExtrato?schema=TADASHI&idCarteira=" +
            this.state.carteiraId +
            "&dtInicio=" +
            this.state.startDate.toISOString() +
            "&dtFim=" +
            this.state.endDate.toISOString()
        )
          .then(res => res.json())
          .then(res => {
            if (!res.message)
              this.setState({
                lancamentos: res,
                isLoading: false
              });
          });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: true
        });
      });
  }

  carregaCarteiras = () => {
    fetch(
      API_PATH + "/api/GetCarteiras?schema=TADASHI&res=EXTRATOS&idUsuario=1"
    )
      .then(res => res.json())
      .then(res => {
        if (!res.message)
        {
          this.setState({
            carteiras: res,
            carteiraId: this.state.carteiras.length > 0 ? this.state.carteiras[0] : 0
          });
        }

        this.carregaExtrato();
      });
  };

  componentDidMount() {
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

    return (
      <div className="extrato">
        <div className="parameters">
          <div className="control">
            <label>Data Inicial: </label>
            <DatePicker
              className="input"
              selected={startDate}
              onChange={this.handlerStartDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="control">
            <label>Data Final: </label>
            <DatePicker
              className="input"
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
