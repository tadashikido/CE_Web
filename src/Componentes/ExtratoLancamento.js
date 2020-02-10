import React from "react";

import { formatReal } from "./Utils";

export default class ExtratoLancamento extends React.Component {
  state = {};

  render() {
    const lancamento = this.props.lancamento;

    return (
      <div className="row">
        <span>{lancamento.nomeCliente || lancamento.razaoSocial}</span>
        <span>{formatReal(lancamento.vlrTotal)}</span>
      </div>
    );
  }
}
