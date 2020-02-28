import React from "react";

import { formatReal } from "../utils";

import "./Saldo.css";

export default class Saldo extends React.Component {
  render() {
    const { descricao, saldo } = this.props;
    return (
      <div className="saldos">
        <span className="descricao">{descricao}</span>
        <span className="saldo">R$ {formatReal(saldo)}</span>
      </div>
    );
  }
}
