import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";

export default class NewTransferencia extends React.Component {
  state = {
    carteirasDestino: [],
    carteiraDestinoId: 0
  };

  handlerTransferenciaClick = () => {
    fetch(API_PATH + "/api/GetCarteiras?res=TRANSFER", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            carteirasDestino: res,
            carteiraDestinoId: res.length > 0 ? res[0].id : 0
          });
        }
      })
      .catch(() => {});
  };

  handlerChangeCarteiraDestino = e => {
    this.setState({
      carteiraDestinoId: e.target.value
    });
  };

  componentDidMount = () => {
    this.handlerTransferenciaClick();
  };

  render() {
    const {
      carteiras,
      valor,
      dataMovimento,
      carteiraId,
      obs,
      onChangeValor,
      onChangeData,
      onChangeCarteira,
      onChangeObs
    } = this.props;

    registerLocale("pt-BR", ptbr);

    return (
      <form className="form-transferencia">
        <div className="control">
          <label>Data: </label>
          <DatePicker
            className="input input-data"
            locale="pt-BR"
            selected={dataMovimento}
            onChange={onChangeData}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="control">
          <label>Valor: </label>
          <input
            className="input input-valor"
            type="text"
            value={valor}
            onChange={onChangeValor}
          />
        </div>

        <div className="control">
          <label>Carteira Origem: </label>
          <select
            className="input"
            onChange={onChangeCarteira}
            value={carteiraId}
          >
            {carteiras.map(carteira => (
              <option key={carteira.id} value={carteira.id}>
                {carteira.descrCarteira}
              </option>
            ))}
          </select>
        </div>

        <div className="control">
          <label>Carteira Destino: </label>
          <select
            className="input"
            onChange={this.handlerChangeCarteiraDestino}
            value={this.state.carteiraDestinoId}
          >
            {this.state.carteirasDestino.map(carteira => (
              <option key={carteira.id} value={carteira.id}>
                {carteira.descrCarteira}
              </option>
            ))}
          </select>
        </div>

        <div className="control">
          <label>Observações: </label>
          <input className="input" type="text" value={obs} onChange={onChangeObs} />
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
  }
}
