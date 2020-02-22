import React from "react";

import { getAuthentication } from "../Login/auth";
import { API_PATH } from "../api";
import Saldo from "./Saldo";
export default class SaldoTiposCarteiraList extends React.Component {
  state = {
    saldosTipoCarteira: [],
    loading: false,
    error: false
  };

  carregarSaldosTipoCarteira = () => {
    this.setState({
      loading: true,
      error: false
    });

    fetch(API_PATH + "/api/saldosTiposCarteira", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message)
          this.setState({
            saldosTipoCarteira: res
          });
      })
      .catch(() => {
        this.setState({
          error: true,
          saldosTipoCarteira: []
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  handlerClick = () => {
    this.carregarSaldosTipoCarteira();
  };

  async componentDidMount() {
    this.carregarSaldosTipoCarteira();
  }

  render() {
    const { saldosTipoCarteira, loading, error } = this.state;

    return (
      <div className="saldos-tipo-carteira">
        <div className="titulo">
          <h2>Saldo por Tipos de Carteira</h2>
          {loading && (
            <img
              alt="carregando"
              className="load"
              src="https://thumbs.gfycat.com/GrimyPlainKakarikis-size_restricted.gif"
            />
          )}
          {!loading && error && (
            <img
              alt="erro ao carregar dados"
              className="error"
              src="https://www.webcolorsonline.com/images/error.png"
              onClick={this.handlerClick}
            />
          )}
          {!loading && !error && (
            <img
              alt="atualizar dados"
              className="error"
              src="https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-1-1/32/button-update-512.png"
              onClick={this.handlerClick}
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
    );
  }
}
