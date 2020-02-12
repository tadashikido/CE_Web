import React from "react";

import { formatReal } from "../Utils";

import "./Lancamento.css";

export default class Lancamento extends React.Component {
  state = {};

  render() {
    const lancamento = this.props.lancamento;

    return (
      <div className="saldos">
        <div className="descricao">
          { lancamento.nomeCliente || lancamento.razaoSocial || "Transferência" }
        </div>
        <div className="saldo">R$ {formatReal(lancamento.vlrTotal)}</div>
      </div>
    );
  }
}
