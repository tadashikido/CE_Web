import React from "react";
import Chart from "react-apexcharts";

import { getAuthentication } from "../Login/auth";
import { API_PATH } from "../api";

export default class DonutChart extends React.Component {
  state = {
    series: [],
    options: {
      chart: {
        type: "donut"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 320
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      labels: [],
      plotOptions: {
        pie: {
          customScale: 0.8
        }
      },
      legend: {
        position: "bottom"
      }
    }
  };

  componentDidMount = () => {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const endDate = new Date();

    fetch(
      API_PATH +
        "/api/despesasPorContasContabeis?" +
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
          series: res.map(valor => valor.valor),
          options: {
            ...this.state.options,
            labels: res.map(valor => valor.rotulo)
          }
        });
      });
  };

  render() {
    return (
      <div className="container-chart chart2">
        <div className="titulo">
          <h2 className="titulos center">DESPESAS POR CATEGORIAS</h2>
        </div>
        <Chart
          series={this.state.series}
          options={this.state.options}
          type="donut"
        />
      </div>
    );
  }
}
