import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

import { formatReal } from "../utils";
import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";
import { Creators as NewLancamentosActions } from "../../Store/ducks/lancamento";

import processando from "../../static/loading.png";

class NewTransferencia extends React.Component {
  carregarCarteiras = () => {
    const {
      setProcessing,
      setProcessed,
      setProcessErro,
      loadCarteiras,
      loadCarteirasDestinos
    } = this.props;

    setProcessing();
    fetch(API_PATH + "/api/carteiras?res=TRANSFER", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw res.message;
        }
        loadCarteiras(res);
        loadCarteirasDestinos(res);
      })
      .catch(() => {
        setProcessErro();
      })
      .finally(() => {
        setProcessed();
      });
  };

  handlerSubmit = e => {
    const {
      valor,
      dataMovimento,
      carteiraId,
      obs,
      autoLancamentoId,
      carteiraDestinoId,

      setProcessing,
      setSuccessSave,
      setErrorSave,
      setRemoveSuccess
    } = this.props;

    e.preventDefault();

    if (!valor) {
      alert("Digite um valor maior que 0!");
      return;
    }

    if (carteiraId === carteiraDestinoId) {
      alert("Selecione uma carteira destino diferente da carteira de origem!");
      return;
    }

    if (!obs) {
      alert("Digite uma observação");
      return;
    }

    setProcessing();
    fetch(
      API_PATH +
        "/api/transferencia?" +
        "autoLanId=" +
        autoLancamentoId +
        "&" +
        "data=" +
        dataMovimento.toISOString() +
        "&" +
        "valor=" +
        valor.replace(",", ".") +
        "&" +
        "carteiraOrigemId=" +
        carteiraId +
        "&" +
        "carteiraDestinoId=" +
        carteiraDestinoId +
        "&" +
        "observacao=" +
        obs,
      {
        method: "POST",
        headers: getAuthentication()
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw res.message;
        } else {
          setSuccessSave();
          setTimeout(() => {
            setRemoveSuccess();
          }, 3000);
        }
      })
      .catch(() => {
        setErrorSave();
      });
  };

  componentDidMount = () => {
    this.carregarCarteiras();
  };

  render() {
    const {
      carteiras,
      carteirasDestino,
      autoLancamentos,

      autoLancamentoId,
      dataMovimento,
      valor,
      carteiraId,
      carteiraDestinoId,
      obs,

      error,

      processing,
      erroSave,
      successSave,
      valorEditing,

      handlerChangeValor,
      handlerChangeData,
      handlerChangeCarteira,
      handlerChangeCarteiraDestino,
      handlerChangeObs,
      handlerChangeAutoLan,

      toggleValorEditing
    } = this.props;

    registerLocale("pt-BR", ptbr);

    if (error)
      return (
        <div className="error">
          <img
            className="img"
            alt="Erro ao processar"
            src="https://cdn2.iconfinder.com/data/icons/oops-404-error/64/208_oops-face-emoji-emoticon-sad-512.png"
          ></img>
          <br />
          <span>Erro ao processar os dados, tente novamente!</span>
        </div>
      );

    if (processing)
      return (
        <div className="processing">
          <img className="img" alt="processando" src={processando}></img>
          <br />
          <span>Processando...</span>
        </div>
      );

    return (
      <form className="form-transferencia" onSubmit={this.handlerSubmit}>
        {successSave && (
          <div className="save-box save-success"> Salvo com sucesso! </div>
        )}

        {erroSave && (
          <div className="save-box save-fail">
            Erro ao salvar, tente novamente!
          </div>
        )}

        {autoLancamentos.length !== 1 && (
          <div className="control">
            <label>Auto Lançamento: </label>
            <select
              className="input"
              onChange={e => handlerChangeAutoLan(e.target.value)}
              value={autoLancamentoId}
            >
              {autoLancamentos.map(autoLan => (
                <option key={autoLan.id} value={autoLan.chave}>
                  {autoLan.chave}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="control">
          <label>Data: </label>
          <DatePicker
            className="input input-data"
            locale="pt-BR"
            selected={dataMovimento}
            onChange={date => handlerChangeData(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="control">
          <label>Valor: </label>
          {valorEditing ? (
            <input
              className="input input-valor"
              type="number"
              pattern="[0-9,]*"
              value={valor}
              onChange={e => handlerChangeValor(e.target.value)}
              onBlur={() => toggleValorEditing()}
            />
          ) : (
            <input
              className="input input-valor"
              type="text"
              value={formatReal(valor)}
              onFocus={() => toggleValorEditing()}
              readOnly
            />
          )}
        </div>

        <div className="control">
          <label>Carteira Origem: </label>
          <select
            className="input"
            onChange={e => handlerChangeCarteira(e.target.value)}
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
            onChange={e => handlerChangeCarteiraDestino(e.target.value)}
            value={carteiraDestinoId}
          >
            {carteirasDestino.map(carteira => (
              <option key={carteira.id} value={carteira.id}>
                {carteira.descrCarteira}
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
            onChange={e => handlerChangeObs(e.target.value)}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
  }
}

const masStateToProps = ({ newLancamento }) => ({
  carteiras: newLancamento.carteiras,
  carteirasDestino: newLancamento.carteirasDestino,
  autoLancamentos: newLancamento.autoLancamentos,

  autoLancamentoId: newLancamento.autoLancamentoId,
  dataMovimento: newLancamento.dataMovimento,
  valor: newLancamento.valor,
  carteiraId: newLancamento.carteiraId,
  carteiraDestinoId: newLancamento.carteiraDestinoId,
  obs: newLancamento.obs,

  error: newLancamento.error,
  valorEditing: newLancamento.valorEditing,

  processing: newLancamento.processing,
  erroSave: newLancamento.erroSave,
  successSave: newLancamento.successSave
});

const masDispatchToProps = dispatch =>
  bindActionCreators(NewLancamentosActions, dispatch);

export default connect(masStateToProps, masDispatchToProps)(NewTransferencia);
