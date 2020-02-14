import React from "react";

import SaldoCarteiraList from "./SaldoCarteirasList";
import SaldoTiposCarteiraList from "./SaldoTiposCarteiraList";
import UltimosLancamentos from "./UltimosLancamentos";

import "./Home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <SaldoTiposCarteiraList />
        <SaldoCarteiraList />
        <UltimosLancamentos />
      </div>
    );
  }
}
