import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

export default class NewDespesa extends React.Component {
  state = {
    contasContabeis: [],
    contaContabilId: 0
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
        <div>
          <label>Data</label>
          <DatePicker
              className="input"
              locale="pt-BR"
              selected={dataMovimento}
              onChange={onChangeData}
              dateFormat="dd/MM/yyyy"
            />
        </div>
      </form>
    );
  }
}
