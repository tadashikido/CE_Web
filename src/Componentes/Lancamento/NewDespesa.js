import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

export default class NewDespesa extends React.Component {
  state = {
    contasContabeis: [],
    contaContabilId: 0
  };

  onChangeContaContabil = e => {
    this.setState({
      contaContabilId: e.target.value
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

        <button type="submit">Salvar</button>
      </form>
    );
  }
}
