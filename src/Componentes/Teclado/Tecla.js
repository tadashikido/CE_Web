import React from "react";

class Tecla extends React.Component {
  render() {
    const { texto, onClick } = this.props;
    return (
      <label className="tecla" onClick={onClick}>
        {texto}
      </label>
    );
  }
}

export default Tecla;
