import React from "react";

import Saldo from "./Saldo";
import Lancamento from "./Lancamento";
import { getAuthentication } from "../Login/auth";
import { API_PATH } from "../api";

import "./Home.css";

export default class Home extends React.Component {
  state = {
    saldosCarteira: [],
    saldosTipoCarteira: [],
    ultimosLancamentos: [],
    loadingSaldosCarteiras: false,
    loadingSaldosTiposCarteira: false,
    loadingLancamentos: false
  };

  carregarSaldosTipoCarteira = () => {
    this.setState({
      loadingSaldosTiposCarteira: true
    });

    fetch(API_PATH + "/api/GetSaldosTiposCarteira", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message)
          this.setState({
            saldosTipoCarteira: res
          });
      })
      .finally(() => {
        this.setState({
          loadingSaldosTiposCarteira: false
        });
      });
  };

  carregarSaldosCarteira = () => {
    this.setState({
      loadingSaldosCarteiras: true
    });

    fetch(API_PATH + "/api/GetSaldosCarteira", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message)
          this.setState({
            saldosCarteira: res
          });
      })
      .finally(() => {
        this.setState({
          loadingSaldosCarteiras: false
        });
      });
  };

  carregarUltimosLancamentos = () => {
    this.setState({
      loadingLancamentos: true
    });

    fetch(API_PATH + "/api/GetUltimosLancamentos", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message)
          this.setState({
            ultimosLancamentos: res
          });
      })
      .finally(() => {
        this.setState({
          loadingLancamentos: false
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
      ultimosLancamentos,
      loadingLancamentos,
      loadingSaldosCarteiras,
      loadingSaldosTiposCarteira
    } = this.state;

    return (
      <div className="home">
        <div className="saldos-tipo-carteira">
          <div className="titulo">
            <h2>Saldo por Tipos de Carteira</h2>
            {loadingSaldosTiposCarteira && (
              <img
                className="load"
                src="https://thumbs.gfycat.com/GrimyPlainKakarikis-size_restricted.gif"
              />
            )}
          </div>
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
          <div className="titulo">
            <h2 className="titulos">Saldo por Carteiras</h2>
            {loadingSaldosCarteiras && (
              <img
                className="load"
                src="https://thumbs.gfycat.com/GrimyPlainKakarikis-size_restricted.gif"
              />
            )}
          </div>
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
          <div className="titulo">
            <h2 className="titulos">Últimos Lançamentos</h2>
            {loadingLancamentos && (
              <img
                className="load"
                src="https://thumbs.gfycat.com/GrimyPlainKakarikis-size_restricted.gif"
              />
            )}
          </div>
          {ultimosLancamentos.map(lancamento => (
            <Lancamento key={lancamento.id} lancamento={lancamento} />
          ))}
        </div>
      </div>
    );
  }
}
