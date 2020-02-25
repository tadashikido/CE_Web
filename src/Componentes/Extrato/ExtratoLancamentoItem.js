import React from "react";
import { Delete } from "@material-ui/icons";

import { formatReal } from "../Utils";

import "./ExtratoLancamentoItem.css";

export default class ExtratoLancamento extends React.Component {
  handlerDelete = id => {
    console.log(id);
  };

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
        <div className="actions">
          <button onClick={() => this.handlerDelete(lancamento.id)}>
            <Delete className="ico" />
          </button>
        </div>
        <div className="origem">
          <div className="nome">
            {lancamento.nomeCliente ||
              lancamento.razaoSocial ||
              "TRANSFERÊNCIA"}
          </div>
          <div className="obs">{lancamento.obs}</div>
        </div>
        <div className={this.getClassNameValor(lancamento.vlrTotal)}>
          R$ {formatReal(lancamento.vlrTotal)}
        </div>
      </div>
    );
  }
}
