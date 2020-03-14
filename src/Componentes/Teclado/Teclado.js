import React, { Fragment } from "react";

import Tecla from "./Tecla";

import "./Teclado.css";

class Teclado extends React.Component {
  state = {
    valor: ""
  };

  constructor(props) {
    super(props);

    this.state = {
      valor: this.props.valor || ""
    };
  }

  handlerClick = numero => {
    if (
      this.state.valor.indexOf(".") === -1 ||
      this.state.valor.length <= this.state.valor.indexOf(".") + 2
    )
      this.setState({
        valor: this.state.valor + numero
      });
  };

  handlerMemoryClick = () => {
    this.setState({
      valor: this.props.valor || ""
    });
  };

  handlerClearClick = () => {
    this.setState({
      valor: this.state.valor.substr(0, this.state.valor.length - 1)
    });
  };

  handlerClearAllClick = () => {
    this.setState({
      valor: ""
    });
  };

  handlerVirgulaClick = () => {
    !this.state.valor.includes(".") &&
      this.setState({
        valor: this.state.valor + "."
      });
  };

  render() {
    const { onOkClick } = this.props;

    return (
      <Fragment>
        <div className="teclado-fundo" />
        <div className="teclado-container">
          <div className="display">
            <label>{this.state.valor}</label>
          </div>
          <div className="linha">
            <Tecla texto="*" onClick={() => this.handlerMemoryClick()} />
            <Tecla texto="C" onClick={() => this.handlerClearClick()} />
            <Tecla texto="CE" onClick={() => this.handlerClearAllClick()} />
          </div>
          <div className="linha">
            <Tecla texto="1" onClick={() => this.handlerClick("1")} />
            <Tecla texto="2" onClick={() => this.handlerClick("2")} />
            <Tecla texto="3" onClick={() => this.handlerClick("3")} />
          </div>
          <div className="linha">
            <Tecla texto="4" onClick={() => this.handlerClick("4")} />
            <Tecla texto="5" onClick={() => this.handlerClick("5")} />
            <Tecla texto="6" onClick={() => this.handlerClick("6")} />
          </div>
          <div className="linha">
            <Tecla texto="7" onClick={() => this.handlerClick("7")} />
            <Tecla texto="8" onClick={() => this.handlerClick("8")} />
            <Tecla texto="9" onClick={() => this.handlerClick("9")} />
          </div>
          <div className="linha">
            <Tecla texto="0" onClick={() => this.handlerClick("0")} />
            <Tecla texto="," onClick={() => this.handlerVirgulaClick()} />
            <Tecla texto="OK" onClick={() => onOkClick(this.state.valor)} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Teclado;
