import React from "react";

import { formatReal } from "../Utils";

import "./Lancamento.css";

export default class Lancamento extends React.Component {
  state = {};

  render() {
    const lancamento = this.props.lancamento;

    return (
      <div className="movimento">
        <div className="descricao">
        <div className="nome">
            {lancamento.nomeCliente ||
              lancamento.razaoSocial ||
              "TRANSFERÊNCIA"}
          </div>
          <div className="obs">{lancamento.obs}</div>
        </div>
        <div className="valor">R$ {formatReal(lancamento.vlrTotal)}</div>
      </div>
    );
  }
}
