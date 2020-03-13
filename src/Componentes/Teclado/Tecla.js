import React from "react";

class Tecla extends React.Component {
  render() {
    const { texto, onClick } = props;
    return <label onClick={onClick}>{texto}</label>;
  }
}

export default Tecla;
