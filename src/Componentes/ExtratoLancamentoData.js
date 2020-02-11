import React from "react";

import { formatReal, getMonthAbrev } from "./Utils";

import "./ExtratoLancamentoData.css";

export default class ExtratoLancamentoData extends React.Component {
  render() {
    const { data, saldoAcumulado } = this.props;

    return (
      <div className="row">
        <div className="data">
          <span className="dia">{new Date(data).getDate()}</span>
          <span className="mes">{getMonthAbrev(new Date(data))}</span>
        </div>
        <div className="saldo">
          <span>{formatReal(saldoAcumulado)}</span>
        </div>
      </div>
    );
  }
}
