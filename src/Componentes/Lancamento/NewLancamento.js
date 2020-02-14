import React from "react";

import NewReceita from "./NewReceita";
import NewDespesa from "./NewDespesa";
import NewTransferencia from "./NewTransferencia";

import "./NewLancamento.css";

export default class NewLancamento extends React.Component {
  state = {
    receita: false,
    despesa: true,
    transferencia: false,
    carteiras: [],
    servicos: [],
    contasContabeis: [],
    valor: 0,
    dataMovimento: new Date(),
    carteiraId: 0
  };

  render() {
    const { receita, despesa, transferencia } = this.state;

    return (
      <div className="new-lancamento">
        <div className="controle">
          <span>Selecione:</span>
          <div className="buttons">
            <button className="receita">receita</button>
            <button className="despesa">despesa</button>
            <button className="transferencia">transferencia</button>
          </div>
        </div>
        <div className="tipo-lancamento">
          {receita && (
            <NewReceita
              valor={this.state.valor}
              onChangeValue={this.handlerChangeValor}
            />
          )}
          {despesa && (
            <NewDespesa
              valor={this.state.valor}
              onChangeValue={this.handlerChangeValor}
            />
          )}
          {transferencia && (
            <NewTransferencia
              valor={this.state.valor}
              onChangeValue={this.handlerChangeValor}
            />
          )}
        </div>
      </div>
    );
  }
}
