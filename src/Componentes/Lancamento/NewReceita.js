import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DatePicker, { registerLocale } from "react-datepicker";
import ptbr from "date-fns/locale/pt-BR";
import Creatable from "react-select/creatable";

import { formatReal } from "../Utils";
import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";
import processando from "../../static/loading.png";
import { Creators as NewLancamentosActions } from "../../Store/ducks/lancamento";

class NewReceita extends React.Component {
  carregarCarteiras = () => {
    const {
      setProcessing,
      setProcessed,
      setProcessErro,
      loadCarteiras
    } = this.props;

    setProcessing();
    fetch(API_PATH + "/api/carteiras?res=ENTRADAS", {
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

  carregarServicos = () => {
    const {
      setProcessing,
      setProcessed,
      setProcessErro,
      loadServicos
    } = this.props;

    setProcessing();
    fetch(API_PATH + "/api/servicos", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw res.message;
        }
        loadServicos(res);
      })
      .catch(() => {
        setProcessErro();
      })
      .finally(() => {
        setProcessed();
      });
  };

  carregarClientes = () => {
    const {
      setProcessing,
      setProcessed,
      setProcessErro,
      loadClientes
    } = this.props;

    setProcessing();
    fetch(API_PATH + "/api/clientes", {
      method: "GET",
      headers: getAuthentication()
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw res.message;
        }
        loadClientes(res);
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
      clienteNome,
      clienteId,
      servicoId,

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

    if (!clienteNome) {
      alert("Selecione um cliente");
      return;
    }

    if (!obs) {
      alert("Digite uma observação");
      return;
    }

    setProcessing();
    fetch(
      API_PATH +
        "/api/recebimento?" +
        "autoLanId=" +
        autoLancamentoId +
        "&" +
        "clienteId=" +
        clienteId +
        "&" +
        "clienteNome=" +
        clienteNome +
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
        "servicoId=" +
        servicoId +
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
    this.carregarServicos();
    this.carregarClientes();
  };

  render() {
    const {
      clientes,
      carteiras,
      autoLancamentos,
      servicos,

      autoLancamentoId,
      dataMovimento,
      valor,
      carteiraId,
      servicoId,
      obs,

      error,

      processing,
      erroSave,
      successSave,

      handlerChangeData,
      handlerChangeCarteira,
      handlerChangeObs,
      handlerChangeAutoLan,

      handlerChangeCliente,
      handlerChangeServico,
      toggleExibeTeclado
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
      <form className="form-receita" onSubmit={this.handlerSubmit}>
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
          <label>Cliente: </label>
          <Creatable
            classNamePrefix="input-creatable"
            options={clientes}
            getOptionValue={({ id }) => id}
            getOptionLabel={({ nome }) => nome}
            onChange={c => handlerChangeCliente(c.id, c.nome)}
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
          <input
            className="input input-valor"
            type="text"
            value={formatReal(valor)}
            onFocus={() => toggleExibeTeclado()}
            readOnly
          />
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
          <label>Serviço: </label>
          <select
            className="input"
            onChange={e => handlerChangeServico(e.target.value)}
            value={servicoId}
          >
            {servicos.map(servico => (
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
            onChange={e => handlerChangeObs(e.target.value)}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
  }
}

const mapStateToProps = ({ lancamento }) => ({
  clientes: lancamento.clientes,
  carteiras: lancamento.carteiras,
  autoLancamentos: lancamento.autoLancamentos,
  servicos: lancamento.servicos,

  clienteNome: lancamento.clienteNome,
  clienteId: lancamento.clienteId,
  autoLancamentoId: lancamento.autoLancamentoId,
  dataMovimento: lancamento.dataMovimento,
  valor: lancamento.valor,
  carteiraId: lancamento.carteiraId,
  servicoId: lancamento.servicoId,
  obs: lancamento.obs,

  error: lancamento.error,
  valorEditing: lancamento.valorEditing,

  processing: lancamento.processing,
  erroSave: lancamento.erroSave,
  successSave: lancamento.successSave
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(NewLancamentosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewReceita);
