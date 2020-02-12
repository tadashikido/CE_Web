import React from "react";

export default class Home extends React.Component {
  state = {
    saldos: [],
    ultimosLancamentos: []
  };

  carregarSaldos = () => {
    this.setState({
      saldos: [
        {
          descrTipoCarteira: "DINHEIRO",
          saldo: 1000
        },
        {
          descrTipoCarteira: "CONTA",
          saldo: 2000
        }
      ]
    });
  };

  carregarUltimosLancamentos = () => {
    this.setState({
      ultimosLancamentos: [
        {
          dtMovim: "12/02/2020",
          valor: 50,
          origem: "restaurante"
        },
        {
          dtMovim: "12/02/2020",
          valor: 50,
          origem: "restaurante"
        },
        {
          dtMovim: "12/02/2020",
          valor: 50,
          origem: "restaurante"
        },
        {
          dtMovim: "12/02/2020",
          valor: 50,
          origem: "restaurante"
        },
        {
          dtMovim: "12/02/2020",
          valor: 50,
          origem: "restaurante"
        }
      ]
    });
  };

  componentDidMount() {
    this.carregarSaldos();
    this.carregarUltimosLancamentos();
  }

  render() {
    const { saldos, ultimosLancamentos } = this.state;

    return (
      <div className="home">
        <div className="saldos">
          {saldos.map((carteira, i) => (
            <div key={i}>
              <span>{carteira.descrTipoCarteira}</span>
              <span>{carteira.saldo}</span>
            </div>
          ))}
        </div>
        <div className="ultimos-lancamentos">
          {ultimosLancamentos.map((lancamento, i) => (
            <div key={i}>
              <span>{lancamento.dtMovim}</span>
              <span>{lancamento.valor}</span>
              <span>{lancamento.origem}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
