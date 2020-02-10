import React from "react";

import { getMonthAbrev } from "./Utils";

import "./ExtratoLancamentoData.css";

export default class ExtratoLancamentoData extends React.Component {
  render() {
    const data = this.props.data;

    return (
      <div className="row">
      <div className="data">
        <span className="dia">{new Date(data).getDay()}</span>
        <span className="mes">{getMonthAbrev(new Date(data))}</span>
        </div>
      </div>
    );
  }
}
