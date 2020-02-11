import React from "react";

import { formatReal } from "./Utils";

import "./ExtratoLancamentoItem.css";

export default class ExtratoLancamento extends React.Component {
  state = {};

  getClassNameValor(valor) {
    let className = "valor ";

    if (valor >= 0) className += "positivo";
    else className += "negativo";
    return className;
  }

  render() {
    const lancamento = this.props.lancamento;

    return (
      <div className="linhas">
        <div className="origem">
          {lancamento.nomeCliente || lancamento.razaoSocial}
        </div>
        <div className={this.getClassNameValor(lancamento.vlrTotal)}>
          R$ {formatReal(lancamento.vlrTotal)}
        </div>
      </div>
    );
  }
}
