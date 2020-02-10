import React from "react";
import DatePicker from "react-datepicker";

import ExtratoLancamento from "./ExtratoLancamento";
import ExtratoLancamentoData from "./ExtratoLancamentoData";

import "react-datepicker/dist/react-datepicker.css";
import "./Extrato.css";

export default class Extrato extends React.Component {
  state = {
    carteiras: [],
    startDate: new Date(),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    carteiraId: 0,
    saldoAnterior: 0,
    lancamentos: [],
    SaldoAcumulado: 0
  };

  handlerStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  handlerEndDate = date => {
    this.setState({
      endDate: date
    });
  };

  handlerChangeCarteira = value => {
    this.setState({
      carteiraId: value
    });
  };

  handlerClick = () => {
    this.carregaExtrato();
  };

  carregaExtrato() {
    fetch(
      "https://controleventuswebapi.azurewebsites.net/api/GetExtrato?schema=TST&idCarteira=26&dtInicio=" +
        this.state.startDate.toISOString() +
        "&dtFim=" +
        this.state.endDate.toISOString()
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          lancamentos: res
        });
      });
  }

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

    this.carregaExtrato();
  }

  render() {
    const { startDate, endDate, carteiraId } = this.state;

    let data = new Date();
    return (
      <div className="extrato">
        <div className="parameters">
          <div class="control">
            <label>Data Inicial</label>
            <DatePicker
              selected={startDate}
              onChange={this.handlerStartDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div class="control">
            <label>Data Final</label>
            <DatePicker
              selected={endDate}
              onChange={this.handlerEndDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div class="control">
            <label>Carteira</label>
            <select>
              {this.state.carteiras.map(carteira => (
                <option
                  key={carteira.id}
                  value={carteiraId}
                  onChange={this.handlerChangeCarteira}
                >
                  {carteira.descrCarteira}
                </option>
              ))}
            </select>
          </div>
          <button onClick={this.handlerClick}>Pesquisar</button>
        </div>
        <div className="lancamentos">
        {this.state.lancamentos.map(lancamento => {
          let component = [];
          lancamento.carteiraId = 1;
          lancamento.dtMovim !== data &&
            component.push(<ExtratoLancamentoData data={lancamento.dtMovim}/>);

          component.push(<ExtratoLancamento lancamento={lancamento} />);
          data = lancamento.dtMovim;
          return component;
        })}
      </div>
      </div>
    );
  }
}
