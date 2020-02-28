import React from "react";
import { connect } from "react-redux";
import { AttachMoney, MoneyOff, CompareArrows } from "@material-ui/icons";

import NewReceita from "./NewReceita";
import NewDespesa from "./NewDespesa";
import NewTransferencia from "./NewTransferencia";
import { Creators as NewLancamentosActions } from "../../Store/ducks/lancamento";

import "./NewLancamento.css";

function NewLancamento({
  receita,
  despesa,
  transferencia,
  receitaClick,
  despesaClick,
  transferenciaClick
}) {
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
      </div>
    </div>
  );
}

const mapStateToProps = ({ newLancamento }) => ({
  receita: newLancamento.receita,
  despesa: newLancamento.despesa,
  transferencia: newLancamento.transferencia
});

const mapDispatchToProps = dispatch => ({
  receitaClick: () => dispatch(NewLancamentosActions.receitaClick()),
  despesaClick: () => dispatch(NewLancamentosActions.despesaClick()),
  transferenciaClick: () => dispatch(NewLancamentosActions.transferenciaClick())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewLancamento);
