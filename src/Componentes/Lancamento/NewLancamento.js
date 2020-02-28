import React from "react";
import { connect } from "react-redux";
import { AttachMoney, MoneyOff, CompareArrows } from "@material-ui/icons";

import { API_PATH } from "../api";
import { getAuthentication } from "../Login/auth";
import NewReceita from "./NewReceita";
import NewDespesa from "./NewDespesa";
import NewTransferencia from "./NewTransferencia";
import { Creators as NewLancamentosActions } from "../../Store/ducks/newLancamento";

import "./NewLancamento.css";

function NewLancamento({ params, dispatch }) {
  // function handlerDespesaClick() {
  //   this.setState({
  //     receita: false,
  //     despesa: true,
  //     transferencia: false,
  //     error: false
  //   });

  //   fetch(API_PATH + "/api/carteiras?res=SAIDAS", {
  //     method: "GET",
  //     headers: getAuthentication()
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (!res.message) {
  //         this.setState({
  //           carteiras: res,
  //           carteiraId: this.state.carteiraId
  //             ? this.state.carteiraId
  //             : res.length > 0
  //             ? res[0].id
  //             : 0
  //         });
  //         this.carregaAutosLancamentos();
  //       }
  //     })
  //     .catch(() => {
  //       this.setState({
  //         error: true
  //       });
  //     });
  // }

  // function handlerReceitaClick() {
  //   this.setState({
  //     receita: true,
  //     despesa: false,
  //     transferencia: false,
  //     error: false
  //   });

  //   fetch(API_PATH + "/api/carteiras?res=ENTRADAS", {
  //     method: "GET",
  //     headers: getAuthentication()
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (!res.message) {
  //         this.setState({
  //           carteiras: res,
  //           carteiraId: this.state.carteiraId
  //             ? this.state.carteiraId
  //             : res.length > 0
  //             ? res[0].id
  //             : 0
  //         });
  //         carregaAutosLancamentos();
  //       }
  //     })
  //     .catch(() => {
  //       this.setState({
  //         error: true
  //       });
  //     });
  // }

  // function handlerTransferenciaClick() {
  //   this.setState({
  //     receita: false,
  //     despesa: false,
  //     transferencia: true,
  //     error: false
  //   });

  //   fetch(API_PATH + "/api/carteiras?res=TRANSFER", {
  //     method: "GET",
  //     headers: getAuthentication()
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (!res.message) {
  //         this.setState({
  //           carteiras: res,
  //           carteiraId: this.state.carteiraId
  //             ? this.state.carteiraId
  //             : res.length > 0
  //             ? res[0].id
  //             : 0
  //         });
  //         this.carregaAutosLancamentos();
  //       }
  //     })
  //     .catch(() => {
  //       this.setState({
  //         error: true
  //       });
  //     });
  // }

  // function carregaAutosLancamentos() {
  //   fetch(API_PATH + "/api/autoLancamentos", {
  //     method: "GET",
  //     headers: getAuthentication()
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (!res.message) {
  //         this.setState({
  //           autoLancamentos: res,
  //           autoLancamentoId: res.length > 0 ? res[0].id : 0
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       this.setState({
  //         error: true
  //       });
  //     });
  // }

  // componentDidMount = () => {
  //   this.handlerDespesaClick();
  // };
  return (
    <div className="new-lancamento">
      <div className="controle">
        <span>Selecione:</span>
        <div className="buttons">
          <button
            className={"receita " + (params.receita ? "activebutton" : "")}
            onClick={() => dispatch(NewLancamentosActions.receitaClick())}
          >
            <AttachMoney />
          </button>
          <button
            className={"despesa " + (params.despesa ? "activebutton" : "")}
            onClick={() => dispatch(NewLancamentosActions.despesaClick())}
          >
            <MoneyOff />
          </button>
          <button
            className={
              "transferencia " + (params.transferencia ? "activebutton" : "")
            }
            onClick={() => dispatch(NewLancamentosActions.transferenciaClick())}
          >
            <CompareArrows />
          </button>
        </div>
      </div>
      <div
        className={
          "tipo-lancamento " +
          (params.receita
            ? "receita"
            : params.despesa
            ? "despesa"
            : "transferencia")
        }
      >
        {params.receita && <NewReceita />}
        {params.despesa && <NewDespesa />}
        {params.transferencia && <NewTransferencia />}
      </div>
    </div>
  );
}

export default connect(state => ({
  params: state
}))(NewLancamento);
