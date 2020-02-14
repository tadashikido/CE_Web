import React from "react";

import { getAuthentication } from "../Login/auth";
import { API_PATH } from "../api";
import Lancamento from "./Lancamento";

export default class UltimosLancamentos extends React.Component {
  state = {
    ultimosLancamentos: [],
    loading: false,
    error: false
  };

  carregarUltimosLancamentos = () => {
    this.setState({
      loading: true,
      error: false
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
      .catch(() => {
        this.setState({
          error: true,
          ultimosLancamentos: []
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  };

  handlerClick = () => {
    this.carregarUltimosLancamentos();
  };

  async componentDidMount() {
    this.carregarUltimosLancamentos();
  }

  render() {
    const { ultimosLancamentos, loading, error } = this.state;

    return (
      <div className="ultimos-lancamentos">
        <div className="titulo">
          <h2 className="titulos">Últimos Lançamentos</h2>
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
        {ultimosLancamentos.map(lancamento => (
          <Lancamento key={lancamento.id} lancamento={lancamento} />
        ))}
      </div>
    );
  }
}
