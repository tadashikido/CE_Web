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

  handlerReceitaClick = () => {
    this.setState({
      receita: true,
      despesa: false,
      transferencia: false
    });
  };

  handlerDespesaClick = () => {
    this.setState({
      receita: false,
      despesa: true,
      transferencia: false
    });
  };

  handlerTransferenciaClick = () => {
    this.setState({
      receita: false,
      despesa: false,
      transferencia: true
    });
  };

  render() {
    const { receita, despesa, transferencia } = this.state;

    return (
      <div className="new-lancamento">
        <div className="controle">
          <span>Selecione:</span>
          <div className="buttons">
            <button className="receita" onClick={this.handlerReceitaClick}>
              R
            </button>
            <button className="despesa" onClick={this.handlerDespesaClick}>
              D
            </button>
            <button
              className="transferencia"
              onClick={this.handlerTransferenciaClick}
            >
              T
            </button>
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
