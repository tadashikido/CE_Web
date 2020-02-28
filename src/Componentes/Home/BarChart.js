import React from "react";
import Chart from "react-apexcharts";

import { getAuthentication } from "../Login/auth";
import { API_PATH } from "../api";

export default class BarChart extends React.Component {
  state = {
    options: {
      chart: {
        id: "bar-chart"
      },
      xaxis: {
        categories: []
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#2d4cbd", "#c22b2b"]
    },

    series: [
      {
        name: "Receitas",
        data: []
      },
      {
        name: "Despesas",
        data: []
      }
    ]
  };

  componentDidMount = () => {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    startDate.setMonth(startDate.getMonth() - 5);

    const endDate = new Date();

    fetch(
      API_PATH +
        "/api/receitasPorMes?" +
        "dataInicial=" +
        startDate.toISOString() +
        "&" +
        "dataFinal=" +
        endDate.toISOString(),
      {
        method: "GET",
        headers: getAuthentication()
      }
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              categories: res.map(valor => valor.rotulo)
            }
          },
          series: [
            { name: "Receitas", data: res.map(valor => valor.valor) },
            ...this.state.series.slice(1, 2)
          ]
        });
      });

    fetch(
      API_PATH +
        "/api/despesasPorMes?" +
        "dataInicial=" +
        startDate.toISOString() +
        "&" +
        "dataFinal=" +
        endDate.toISOString(),
      {
        method: "GET",
        headers: getAuthentication()
      }
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          options: {
            ...this.state.options,
            xaxis: {
              categories: res.map(valor => valor.rotulo)
            }
          },
          series: [
            ...this.state.series.slice(0, 1),
            { name: "Despesas", data: res.map(valor => valor.valor) }
          ]
        });
      });
  };

  render() {
    return (
      <div className="container-chart">
        <div className="titulo">
          <h2 className="titulos center">RECEITAS X DESPESAS</h2>
        </div>
        <Chart
          type="bar"
          options={this.state.options}
          series={this.state.series}
        />
      </div>
    );
  }
}
