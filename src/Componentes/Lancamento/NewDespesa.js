import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";

export default class NewDespesa extends React.Component {
  state = {
    contasContabeis: [],
    contaContabilId: 0,
    fornecedores: [],
    nomeFornecedor: ""
  };

  carregarContasContabeis = () => {
    fetch(API_PATH + "/api/GetContasContabeis", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            contasContabeis: res,
            contaContabilId: res.length > 0 ? res[0].id : 0
          });
        }
      })
      .catch(() => {});
  };

  carregarFornecedores = () => {
    fetch(API_PATH + "/api/GetFornecedores", {
      method: "POST",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            fornecedores: res
          });
        }
      })
      .catch(() => {});
  };

  onChangeContaContabil = e => {
    this.setState({
      contaContabilId: e.target.value
    });
  };

  componentDidMount = () => {
    this.carregarContasContabeis();
    this.carregarFornecedores();
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
      <form className="form-despesa">
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
          <label>Carteira: </label>
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
          <label>Conta Contábil: </label>
          <select
            className="input"
            onChange={this.onChangeContaContabil}
            value={this.state.contaContabilId}
          >
            {this.state.contasContabeis.map(contaContabil => (
              <option key={contaContabil.ctaCtbl} value={contaContabil.ctaCtbl}>
                {contaContabil.descricao}
              </option>
            ))}
          </select>
        </div>

        <div className="control">
          <label>Observações: </label>
          <input
            className="input"
            type="text"
            value={obs}
            onChange={onChangeObs}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
  }
}
