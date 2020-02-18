import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

export default class NewReceita extends React.Component {
  state = {
    servicos: [],
    servicoId: 0
  };

  onChangeServico = e => {
    this.setState({
      servicoId: e.target.value
    })
  }

  render() {
    const {
      carteiras,
      valor,
      dataMovimento,
      carteiraId,
      onChangeValor,
      onChangeData,
      onChangeCarteira
    } = this.props;

    registerLocale("pt-BR", ptbr);

    return (
      <form className="form-receita" onSubmit={this.handlerOnSubimit}>
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
          <input className="input input-valor" type="text" value={valor} onChange={onChangeValor} />
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

        <button type="submit">Salvar</button>
      </form>
    );
  }
}
