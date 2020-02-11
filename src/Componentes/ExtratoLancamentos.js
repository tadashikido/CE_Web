import React from "react";

import ExtratoLancamentoItem from "./ExtratoLancamentoItem";
import ExtratoLancamentoData from "./ExtratoLancamentoData";

import "./ExtratoLancamentos.css";

export default class ExtratoLancamentos extends React.Component {
  
  render() {
    const { isLoading, lancamentos, saldoAnterior } = this.props;

    if (isLoading)
      return (
        <div className="loading">
          <img
            className="img"
            alt="carregando"
            src="https://dataamerica.com.br/wp-content/uploads/2018/03/Round-Animated-Loading-Gif.gif"
          ></img>
          <br />
          <span>Carregando...</span>
        </div>
      );

      if (!isLoading && lancamentos.length === 0)
      return (
        <div className="loading">
          <img
            className="img"
            alt="Nenhum registro encontrato"
            src="https://cdn.idevie.com/wp-content/uploads/2016/02/1456208769_258_Geniuses-we-love-Vic-Bell-Illustrator-and-icon-designer.png"
          ></img>
          <br />
          <span>Nenhum registro encontrado!</span>
        </div>
      );

    let data = new Date();
    let saldoAcumulado = saldoAnterior;

    return (
      <div className="lancamentos">
        {lancamentos.map(lancamento => {
          let component = [];
          lancamento.saldoAcumulado = saldoAcumulado;
          lancamento.dtMovim !== data &&
            component.push(
              <ExtratoLancamentoData
                key={lancamento.dtMovim}
                data={lancamento.dtMovim}
                saldoAcumulado={lancamento.saldoAcumulado}
              />
            );

          component.push(
            <ExtratoLancamentoItem key={lancamento.id} lancamento={lancamento} />
          );
          data = lancamento.dtMovim;
          saldoAcumulado += lancamento.vlrTotal;
          return component;
        })}
      </div>
    );
  }
}
