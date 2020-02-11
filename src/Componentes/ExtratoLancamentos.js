import React from "react";

import ExtratoLancamento from "./ExtratoLancamentoItem";
import ExtratoLancamentoData from "./ExtratoLancamentoData";

import "./ExtratoLancamentos.css";

export default class ExtratoLancamentos extends React.Component {
  render() {
    const { isLoading, lancamentos } = this.props;

    if (isLoading)
      return (
        <div className="loading">
          <img
            className="img"
            src="https://dataamerica.com.br/wp-content/uploads/2018/03/Round-Animated-Loading-Gif.gif"
          ></img>
          <br />
          <span>Carregando...</span>
        </div>
      );

    let data = new Date();

    return (
      <div className="lancamentos">
        {lancamentos.map(lancamento => {
          let component = [];
          lancamento.carteiraId = 1;
          lancamento.dtMovim !== data &&
            component.push(
              <ExtratoLancamentoData
                key={lancamento.dtMovim}
                data={lancamento.dtMovim}
              />
            );

          component.push(
            <ExtratoLancamento key={lancamento.id} lancamento={lancamento} />
          );
          data = lancamento.dtMovim;
          return component;
        })}
      </div>
    );
  }
}
