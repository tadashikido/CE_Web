import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";

import { formatReal } from "../utils";
import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";
import { Creators as NewLancamentosActions } from "../../Store/ducks/newLancamento";

import processando from "../../static/loading.png";

class NewTransferencia extends React.Component {
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

    if (!valor) {
      alert("Digite um valor maior que 0!");
      return;
    }

    if (carteiraId === this.state.carteiraDestinoId) {
      alert("Selecione uma carteira destino diferente da carteira de origem!");
      return;
    }

    if (!obs) {
      alert("Digite uma observação");
      return;
    }

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
      autoLancamentos,
      autoLancamentoId,
      onChangeAutoLan,
      error
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

    if (this.state.processing)
      return (
        <div className="processing">
          <img className="img" alt="processando" src={processando}></img>
          <br />
          <span>Processando...</span>
        </div>
      );

    const {
      handlerChangeAutoLan,
      handlerChangeData,
      handlerChangeValor,
      handlerChangeCarteira,
      handlerChangeObs
    } = this.props;

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
          {this.state.valorEditing ? (
            <input
              className="input input-valor"
              type="text"
              value={valor}
              onChange={e => handlerChangeValor(e.target.value)}
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
            onChange={e => handlerChangeObs(e.target.value)}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
  }
}

NewLancamentosActions;
const masStateToProps = state => ({
  params: state
});

const masDispatchToProps = dispatch =>
  bindActionCreators(NewLancamentosActions, dispatch);

export default connect(masStateToProps, masDispatchToProps)(NewTransferencia);
