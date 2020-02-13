import React from "react";

import Saldo from "./Saldo";
import Lancamento from "./Lancamento";
import { API_PATH } from "../api";

import "./Home.css";

export default class Home extends React.Component {
  state = {
    saldosCarteira: [],
    saldosTipoCarteira: [],
    ultimosLancamentos: []
  };

  carregarSaldosTipoCarteira = () => {
    fetch(API_PATH + "/api/GetSaldosTiposCarteira?schema=TADASHI&idUsuario=1")
      .then(res => res.json())
      .then(res => {
        this.setState({
          saldosTipoCarteira: res
        });
      });
  };

  carregarSaldosCarteira = () => {
    fetch(API_PATH + "/api/GetSaldosCarteira?schema=TADASHI&idUsuario=1")
      .then(res => res.json())
      .then(res => {
        this.setState({
          saldosCarteira: res
        });
      });
  };

  carregarUltimosLancamentos = () => {
    fetch(API_PATH + "/api/GetUltimosLancamentos?schema=TADASHI&idUsuario=1")
      .then(res => res.json())
      .then(res => {
        this.setState({
          ultimosLancamentos: res
        });
      });
  };

  componentDidMount() {
    this.carregarSaldosTipoCarteira();
    this.carregarSaldosCarteira();
    this.carregarUltimosLancamentos();
  }

  render() {
    const {
      saldosTipoCarteira,
      saldosCarteira,
      ultimosLancamentos
    } = this.state;

    return (
      <div className="home">
        <div className="saldos-tipo-carteira">
          <h2 className="titulos">Saldo por Tipos de Carteira</h2>
          {saldosTipoCarteira.map((carteira, i) => (
            <Saldo
              key={carteira.id}
              descricao={carteira.descricao}
              saldo={carteira.saldo}
            />
          ))}
          <Saldo
            descricao="TOTAL"
            saldo={saldosTipoCarteira.reduce(
              (total, carteira) => total + carteira.saldo,
              0
            )}
          />
        </div>
        <div className="saldos-carteira">
          <h2 className="titulos">Saldo por Carteiras</h2>
          {saldosCarteira.map((carteira, i) => (
            <Saldo
              key={carteira.id}
              descricao={carteira.descricao}
              saldo={carteira.saldo}
            />
          ))}
          <Saldo
            descricao="TOTAL"
            saldo={saldosCarteira.reduce(
              (total, carteira) => total + carteira.saldo,
              0
            )}
          />
        </div>
        <div className="ultimos-lancamentos">
          <h2 className="titulos">Últimos Lançamentos</h2>
          {ultimosLancamentos.map(lancamento => (
            <Lancamento key={lancamento.id} lancamento={lancamento} />
          ))}
        </div>
      </div>
    );
  }
}
