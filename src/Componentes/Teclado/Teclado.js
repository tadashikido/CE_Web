import React from "react";

import Tecla from "./Tecla";

class Teclado extends React.Component {
  state = {
    valor: "0"
  };

  handlerClick = numero => {
      this.setState({
          valor: valor + numero
      })
  };

  handlerEnter = () => {
      
  }

  render() {
    return (
      <div class="teclado-container">
        <div class="display">
          <label></label>
        </div>
        <div class="linha">
          <Tecla texto="1" onClick={() => this.handlerClick("1")} />
          <Tecla texto="2" onClick={() => this.handlerClick("2")} />
          <Tecla texto="3" onClick={() => this.handlerClick("3")} />
        </div>
        <div class="linha">
          <Tecla texto="4" onClick={() => this.handlerClick("4")} />
          <Tecla texto="5" onClick={() => this.handlerClick("5")} />
          <Tecla texto="6" onClick={() => this.handlerClick("6")} />
        </div>
        <div class="linha">
          <Tecla texto="7" onClick={() => this.handlerClick("7")} />
          <Tecla texto="8" onClick={() => this.handlerClick("8")} />
          <Tecla texto="9" onClick={() => this.handlerClick("9")} />
        </div>
        <div class="linha">
          <Tecla texto="0" onClick={() => this.handlerClick("7")} />
          <Tecla texto="OK" onClick={() => this.handlerEnter()} />
        </div>
      </div>
    );
  }
}

export default Teclado;
