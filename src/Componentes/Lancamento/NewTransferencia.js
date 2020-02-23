import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

import { formatReal } from "../Utils";
import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";
import processando from "../../static/loading.png";

export default class NewTransferencia extends React.Component {
  state = {
    carteirasDestino: [],
    carteiraDestinoId: 0,
    valorEditing: false,
    processing: false,
    erroSave: false,
    save: false
  };

  carregarCarteirasDestinos = () => {
    this.setState({
      processing: true
    });
    fetch(API_PATH + "/api/carteiras?res=TRANSFER", {
      method: "GET",
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
      .catch(() => {})
      .finally(() => {
        this.setState({
          processing: false
        });
      });
  };

  handlerChangeCarteiraDestino = e => {
    this.setState({
      carteiraDestinoId: e.target.value
    });
  };

  toggleValorEditing = () => {
    this.setState({
      valorEditing: !this.state.valorEditing
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    this.setState({
      erroSave: false,
      processing: true
    });
    fetch(API_PATH + "/api/transferencia", {
      method: "POST",
      headers: getAuthentication(),
      body: {}
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          this.setState({
            erroSave: true
          });
        }
      })
      .catch(() => {
        this.setState({
          erroSave: true,
          processing: false
        });
      });
  };

  handlerSubmit = e => {
    const {
      valor,
      dataMovimento,
      carteiraId,
      obs,
      autoLancamentoId
    } = this.props;

    e.preventDefault();
    this.setState({
      erroSave: false,
      processing: true
    });
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
        this.state.carteiraDestinoId +
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
          this.setState({
            erroSave: true
          });
        } else {
          this.setState({
            save: true
          });
          setTimeout(() => {
            this.setState({
              save: false
            });
          }, 3000);
        }
      })
      .catch(() => {
        this.setState({
          erroSave: true
        });
      })
      .finally(() => {
        this.setState({
          processing: false
        });
      });
  };

  componentDidMount = () => {
    this.carregarCarteirasDestinos();
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
      onChangeObs,
      autoLancamentos,
      autoLancamentoId,
      onChangeAutoLan
    } = this.props;

    registerLocale("pt-BR", ptbr);

    if (this.state.processing)
      return (
        <div className="processing">
          <img className="img" alt="processando" src={processando}></img>
          <br />
          <span>Processando...</span>
        </div>
      );

    return (
      <form className="form-transferencia" onSubmit={this.handlerSubmit}>
        {this.state.save && (
          <div className="save-box save-success"> Salvo com sucesso! </div>
        )}
        {this.state.erroSave && (
          <div className="save-box save-fail">
            Erro ao salvar, tente novamente!
          </div>
        )}
        {autoLancamentos.length !== 1 && (
          <div className="control">
            <label>Auto Lançamento: </label>
            <select
              className="input"
              onChange={onChangeAutoLan}
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
