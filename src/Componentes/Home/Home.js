import React from "react";

import Saldo from "./Saldo";
import Lancamento from "./Lancamento";

import "./Home.css";

export default class Home extends React.Component {
  state = {
    saldosCarteira: [],
    saldosTipoCarteira: [],
    ultimosLancamentos: []
  };

  carregarSaldosTipoCarteira = () => {
    this.setState({
      saldosTipoCarteira: [
        {
          idTipoCarteira: 1,
          descrTipoCarteira: "DINHEIRO",
          saldo: 1000
        },
        {
          idTipoCarteira: 2,
          descrTipoCarteira: "CONTA",
          saldo: 2000
        }
      ]
    });
  };

  carregarSaldosCarteira = () => {
    this.setState({
      saldosCarteira: [
        {
          idCarteira: 1,
          descrCarteira: "SICOOB",
          saldo: 1000
        },
        {
          idCarteira: 2,
          descrCarteira: "CARTEIRA",
          saldo: 2000
        }
      ]
    });
  };

  carregarUltimosLancamentos = () => {
    this.setState({
      ultimosLancamentos: [
        {
          idFatura: 1,
          obs: "obs",
          vlrTotal: 50,
          nomeCliente: "restaurante"
        },
        {
          idFatura: 2,
          obs: "obs",
          vlrTotal: 50,
          nomeCliente: "restaurante"
        },
        {
          idFatura: 0,
          obs: "obs",
          vlrTotal: 50,
          nomeCliente: "restaurante"
        },
        {
          idFatura: 3,
          obs: "obs",
          vlrTotal: 50,
          nomeCliente: "restaurante"
        },
        {
          idFatura: 4,
          obs: "obs",
          vlrTotal: 50,
          nomeCliente: "restaurante"
        }
      ]
    });
  };

  componentDidMount() {
    this.carregarSaldosTipoCarteira();
    this.carregarSaldosCarteira();
    this.carregarUltimosLancamentos();
  }

  render() {
    const {
      saldosTipoCarteira,
      saldosCarteira,
      ultimosLancamentos
    } = this.state;

    return (
      <div className="home">
        <div className="saldos-tipo-carteira">
          <h2 className="titulos">Saldo por Tipos de Carteira</h2>
          {saldosTipoCarteira.map((carteira, i) => (
            <Saldo
              key={carteira.idTipoCarteira}
              descricao={carteira.descrTipoCarteira}
              saldo={carteira.saldo}
            />
          ))}
          <Saldo
            descricao="TOTAL"
            saldo={saldosTipoCarteira.reduce(
              (total, carteira) => total + carteira.saldo,
              0
            )}
          />
        </div>
        <div className="saldos-carteira">
          <h2 className="titulos">Saldo por Carteiras</h2>
          {saldosCarteira.map((carteira, i) => (
            <Saldo
              key={carteira.idCarteira}
              descricao={carteira.descrCarteira}
              saldo={carteira.saldo}
            />
          ))}
          <Saldo
            descricao="TOTAL"
            saldo={saldosCarteira.reduce(
              (total, carteira) => total + carteira.saldo,
              0
            )}
          />
        </div>
        <div className="ultimos-lancamentos">
          <h2 className="titulos">Últimos Lançamentos</h2>
          {ultimosLancamentos.map(lancamento => (
            <Lancamento key={lancamento.idFatura} lancamento={lancamento} />
          ))}
        </div>
      </div>
    );
  }
}
