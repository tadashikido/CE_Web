import React from "react";
import { connect } from "react-redux";
import { AttachMoney, MoneyOff, CompareArrows } from "@material-ui/icons";

import NewReceita from "./NewReceita";
import NewDespesa from "./NewDespesa";
import NewTransferencia from "./NewTransferencia";
import { Creators as NewLancamentosActions } from "../../Store/ducks/lancamento";
import Teclado from "../Teclado/Teclado";

import "./NewLancamento.css";

function NewLancamento({
  receita,
  despesa,
  transferencia,
  valor,
  exibeTeclado,
  receitaClick,
  despesaClick,
  transferenciaClick,
  toggleExibeTeclado,
  handlerChangeValor
}) {
  function handlerOkClick(valor) {
    console.log(valor);
    toggleExibeTeclado();
    handlerChangeValor(valor);
  }

  return (
    <div className="new-lancamento">
      <div className="controle">
        <span>Selecione:</span>
        <div className="buttons">
          <button
            className={"receita " + (receita ? "activebutton" : "")}
            onClick={receitaClick}
          >
            <AttachMoney />
          </button>
          <button
            className={"despesa " + (despesa ? "activebutton" : "")}
            onClick={despesaClick}
          >
            <MoneyOff />
          </button>
          <button
            className={"transferencia " + (transferencia ? "activebutton" : "")}
            onClick={transferenciaClick}
          >
            <CompareArrows />
          </button>
        </div>
      </div>
      <div
        className={
          "tipo-lancamento " +
          (receita ? "receita" : despesa ? "despesa" : "transferencia")
        }
      >
        {receita && <NewReceita />}
        {despesa && <NewDespesa />}
        {transferencia && <NewTransferencia />}
        {exibeTeclado && (
          <Teclado valor={valor} onOkClick={valor => handlerOkClick(valor)} />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ newLancamento }) => ({
  receita: newLancamento.receita,
  despesa: newLancamento.despesa,
  transferencia: newLancamento.transferencia,
  valor: newLancamento.valor,
  exibeTeclado: newLancamento.exibeTeclado
});

const mapDispatchToProps = dispatch => ({
  receitaClick: () => dispatch(NewLancamentosActions.receitaClick()),
  despesaClick: () => dispatch(NewLancamentosActions.despesaClick()),
  transferenciaClick: () =>
    dispatch(NewLancamentosActions.transferenciaClick()),
  toggleExibeTeclado: () =>
    dispatch(NewLancamentosActions.toggleExibeTeclado()),
  handlerChangeValor: valor =>
    dispatch(NewLancamentosActions.handlerChangeValor(valor))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLancamento);
