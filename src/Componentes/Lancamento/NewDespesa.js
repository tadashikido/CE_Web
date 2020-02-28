import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";
import Creatable from "react-select/creatable";

import { formatReal } from "../utils";
import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";
import processando from "../../static/loading.png";
import { Creators as NewLancamentosActions } from "../../Store/ducks/lancamento";

class NewDespesa extends React.Component {
  carregarCarteiras = () => {
    const {
      setProcessing,
      setProcessed,
      setProcessErro,
      loadCarteiras
    } = this.props;

    setProcessing();
    fetch(API_PATH + "/api/carteiras?res=SAIDAS", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw res.message;
        }
        loadCarteiras(res);
      })
      .catch(() => {
        setProcessErro();
      })
      .finally(() => {
        setProcessed();
      });
  };

  carregarAutosLancamentos = () => {
    const {
      setProcessing,
      setProcessed,
      setProcessErro,
      loadAutoLancamentos
    } = this.props;

    setProcessing();
    fetch(API_PATH + "/api/autoLancamentos", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw res.message;
        }
        loadAutoLancamentos(res);
      })
      .catch(() => {
        setProcessErro();
      })
      .finally(() => {
        setProcessed();
      });
  };

  carregarContasContabeis = () => {
    const {
      setProcessing,
      setProcessed,
      setProcessErro,
      loadContasContabeis
    } = this.props;

    setProcessing();
    fetch(API_PATH + "/api/contasContabeis", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw res.message;
        }
        loadContasContabeis(res);
      })
      .catch(() => {
        setProcessErro();
      })
      .finally(() => {
        setProcessed();
      });
  };

  carregarFornecedores = () => {
    const {
      setProcessing,
      setProcessed,
      setProcessErro,
      loadFornecedores
    } = this.props;

    setProcessing();
    fetch(API_PATH + "/api/fornecedores", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw res.message;
        }
        loadFornecedores(res);
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
      fornecedorId,
      fornecedorNome,
      contaContabilId,

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

    if (!fornecedorNome) {
      alert("Selecione um fornecedor");
      return;
    }

    if (!obs) {
      alert("Digite uma observação");
      return;
    }

    setProcessing();
    fetch(
      API_PATH +
        "/api/pagamento?" +
        "autoLanId=" +
        autoLancamentoId +
        "&" +
        "fornecedorId=" +
        fornecedorId +
        "&" +
        "fornecedorNome=" +
        fornecedorNome +
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
        contaContabilId +
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
        }
        setSuccessSave();
        setTimeout(() => {
          setRemoveSuccess();
        }, 3000);
      })
      .catch(() => {
        setErrorSave();
      });
  };

  componentDidMount = () => {
    this.carregarContasContabeis();
    this.carregarFornecedores();
    this.carregarCarteiras();
    this.carregarAutosLancamentos();
  };

  render() {
    const {
      fornecedores,
      carteiras,
      autoLancamentos,
      contasContabeis,

      autoLancamentoId,
      dataMovimento,
      valor,
      carteiraId,
      contaContabilId,
      obs,

      error,

      processing,
      erroSave,
      successSave,
      valorEditing,

      handlerChangeValor,
      handlerChangeData,
      handlerChangeCarteira,
      handlerChangeObs,
      handlerChangeAutoLan,

      handlerChangeFornecedor,
      handlerChangeContaContabil,
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

    console.log(processing)
    if (processing)
      return (
        <div className="processing">
          <img className="img" alt="processando" src={processando}></img>
          <br />
          <span>Processando...</span>
        </div>
      );

    return (
      <form className="form-despesa" onSubmit={this.handlerSubmit}>
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
          <label>Fornecedor: </label>
          <Creatable
            classNamePrefix="input-creatable"
            options={fornecedores}
            getOptionValue={({ id }) => id}
            getOptionLabel={({ nome }) => nome}
            onChange={f => handlerChangeFornecedor(f.id, f.nome)}
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
            onChange={data => handlerChangeData(data)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="control">
          <label>Valor: </label>
          {valorEditing ? (
            <input
              className="input input-valor"
              type="text"
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
          <label>Carteira: </label>
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
          <label>Conta Contábil: </label>
          <select
            className="input"
            onChange={e => handlerChangeContaContabil(e.target.value)}
            value={contaContabilId}
          >
            {contasContabeis.map(contaContabil => (
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
            onChange={e => handlerChangeObs(e.target.value)}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
  }
}

const mapStateToProps = ({ newLancamento }) => ({
  fornecedores: newLancamento.fornecedores,
  carteiras: newLancamento.carteiras,
  autoLancamentos: newLancamento.autoLancamentos,
  contasContabeis: newLancamento.contasContabeis,

  fornecedorNome: newLancamento.fornecedorNome,
  fornecedorId: newLancamento.fornecedorId,
  autoLancamentoId: newLancamento.autoLancamentoId,
  dataMovimento: newLancamento.dataMovimento,
  valor: newLancamento.valor,
  carteiraId: newLancamento.carteiraId,
  contaContabilId: newLancamento.contaContabilId,
  obs: newLancamento.obs,

  error: newLancamento.error,
  valorEditing: newLancamento.valorEditing,

  processing: newLancamento.processing,
  erroSave: newLancamento.erroSave,
  successSave: newLancamento.successSave
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(NewLancamentosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewDespesa);
