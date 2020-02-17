import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

export default class NewReceita extends React.Component {
  state = {
    servicos: [],
    servicoId: 0
  };

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
      <form>
        <div className="control">
          <label>Data: </label>
          <DatePicker
            className="input"
            locale="pt-BR"
            selected={dataMovimento}
            onChange={onChangeData}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="control">
          <label>Valor: </label>
          <input className="input" type="text" value={valor} onChange={onChangeValor} />
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
      </form>
    );
  }
}
