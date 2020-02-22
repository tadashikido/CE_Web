import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";
import Creatable from "react-select/creatable";

import { formatReal } from "../Utils";
import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";

export default class NewReceita extends React.Component {
  state = {
    servicos: [],
    servicoId: 0,
    clientes: [],
    clienteNome: "",
    clienteId: 0,
    valorEditing: false
  };

  carregarServicos = () => {
    fetch(API_PATH + "/api/servicos", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            servicos: res,
            servicoId: res.length > 0 ? res[0].id : 0
          });
        }
      })
      .catch(() => {});
  };

  carregarClientes = () => {
    fetch(API_PATH + "/api/clientes", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          this.setState({
            clientes: res
          });
        }
      })
      .catch(() => {});
  };

  onChangeCliente = value => {
    this.setState({
      clienteId: value.id,
      clienteNome: value.nome.toUpperCase()
    });
  };

  onChangeServico = e => {
    this.setState({
      servicoId: e.target.value
    });
  };

  toggleValorEditing = () =>
  {
    this.setState({
      valorEditing: !this.state.valorEditing
    });
  }

  componentDidMount = () => {
    this.carregarServicos();
    this.carregarClientes();
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
      <form className="form-receita" onSubmit={this.handlerOnSubimit}>
        <div className="control">
          <label>Cliente: </label>
          <Creatable
            classNamePrefix="input-creatable"
            options={this.state.clientes}
            getOptionValue={({ id }) => id}
            getOptionLabel={({ nome }) => nome}
            onChange={this.onChangeCliente}
            getNewOptionData={inputValue => ({
              id: "0",
              nome: inputValue.toUpperCase()
            })}
            placeholder="Selecione ou digite..."
          />
        </div>
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
          {this.state.valorEditing ? (
            <input
              className="input input-valor"
              type="text"
              value={valor}
              onChange={onChangeValor}
              onBlur={this.toggleValorEditing}
            />
          ) : (
            <input
              className="input input-valor"
              type="text"
              value={formatReal(valor)}
              onFocus={this.toggleValorEditing}
              readOnly
            />
          )}
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
          <label>Serviço: </label>
          <select
            className="input"
            onChange={this.onChangeServico}
            value={this.state.servicoId}
          >
            {this.state.servicos.map(servico => (
              <option key={servico.id} value={servico.id}>
                {servico.descricao}
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
