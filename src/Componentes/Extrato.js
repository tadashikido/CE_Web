import React from "react";
import { Table, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";

import Utils from "./Utils.js";

import "react-datepicker/dist/react-datepicker.css";

export default class Extrato extends React.Component {
  state = {
    carteiras: [],
    parameter: {
      startDate: new Date(),
      endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    },
    saldoAnterior: 0,
    lancamentos: [
      {
        Id: 11,
        DataMovimento: "04/02/2020",
        Origem: "Pronet",
        Valor: 2250,
        SaldoAcumulado: 0,
        Tipo: "E"
      },
      {
        Id: 12,
        DataMovimento: "04/02/2020",
        Origem: "Pronet",
        Valor: 2250,
        SaldoAcumulado: 0,
        Tipo: "E"
      },
      {
        Id: 13,
        DataMovimento: "04/02/2020",
        Origem: "Pronet",
        Valor: 2250,
        SaldoAcumulado: 0,
        Tipo: "E"
      }
    ],
    SaldoAcumulado: 0
  };

  handlerStartDate = date => {
    this.setState({
      parameter: {
        startDate: date
      }
    });
  };

  componentDidMount() {
    fetch(
      "https://controleventuswebapi.azurewebsites.net/api/GetCarteiras?schema=TST"
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          carteiras: res
        });
      });
  };

  render() {
    const { startDate, endDate } = this.state.parameter;

    return (
      <Container>
        {this.state.carteiras.map(carteira => (
          <label key={carteira.id}>{carteira.descrCarteira}</label>
        ))}
        <DatePicker
          selected={startDate}
          onChange={this.handlerStartDate}
          dateFormat="dd/MM/yyyy"
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Registro</td>
              <td>Data Movim</td>
              <td>Origem/Destino</td>
              <td>R$</td>
              <td>Acuml R$</td>
              <td>T.T.</td>
            </tr>
          </thead>
          <tbody>
            {this.state.lancamentos.map(lancamento => (
              <tr key={lancamento.Id}>
                <td>{lancamento.Id}</td>
                <td>{lancamento.DataMovimento}</td>
                <td>{lancamento.Origem}</td>
                <td>{Utils.formatReal(lancamento.Valor)}</td>
                <td>{lancamento.SaldoAcumulado}</td>
                <td>{lancamento.Tipo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
