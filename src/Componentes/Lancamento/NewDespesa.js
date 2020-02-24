import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";
import Creatable from "react-select/creatable";

import { formatReal } from "../Utils";
import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";
import processando from "../../static/loading.png";

export default class NewDespesa extends React.Component {
  state = {
    contasContabeis: [],
    contaContabilId: 0,
    fornecedores: [],
    fornecedorNome: "",
    fornecedorId: 0,
    valorEditing: false,
    processing: false,
    erroSave: false,
    save: false
  };

  carregarContasContabeis = () => {
    this.setState({
      processing: true
    });
    fetch(API_PATH + "/api/contasContabeis", {
      method: "GET",
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
      .catch(() => {})
      .finally(() => {
        this.setState({
          processing: false
        });
      });
  };

  carregarFornecedores = () => {
    this.setState({
      processing: true
    });
    fetch(API_PATH + "/api/fornecedores", {
      method: "GET",
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
      .catch(() => {})
      .finally(() => {
        this.setState({
          processing: false
        });
      });
  };

  onChangeFornecedor = value => {
    this.setState({
      fornecedorId: value.id,
      fornecedorNome: value.nome.toUpperCase()
    });
  };

  onChangeContaContabil = e => {
    this.setState({
      contaContabilId: e.target.value
    });
  };

  toggleValorEditing = () => {
    this.setState({
      valorEditing: !this.state.valorEditing
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
        "/api/pagamento?" +
        "autoLanId=" +
        autoLancamentoId +
        "&" +
        "fornecedorId=" +
        this.state.fornecedorId +
        "&" +
        "fornecedorNome=" +
        this.state.fornecedorNome +
        "&" +
        "data=" +
        dataMovimento.toISOString() +
        "&" +
        "valor=" +
        valor.replace(",", ".") +
        "&" +
        "carteiraId=" +
        carteiraId +
        "&" +
        "contaContabil=" +
        this.state.contaContabilId +
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
      onChangeObs,
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

    return (
      <form className="form-despesa" onSubmit={this.handlerSubmit}>
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
          <label>Fornecedor: </label>
          <Creatable
            classNamePrefix="input-creatable"
            options={this.state.fornecedores}
            getOptionValue={({ id }) => id}
            getOptionLabel={({ nome }) => nome}
            onChange={this.onChangeFornecedor}
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
