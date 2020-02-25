import React from "react";

import SaldoCarteiraList from "./SaldoCarteirasList";
import SaldoTiposCarteiraList from "./SaldoTiposCarteiraList";
import UltimosLancamentos from "./UltimosLancamentos";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";

import "./Home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <SaldoTiposCarteiraList />
        <SaldoCarteiraList />
        <UltimosLancamentos />
        <BarChart />
        <DonutChart />
      </div>
    );
  }
}
