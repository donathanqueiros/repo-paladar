import React, { Component } from "react";
import "./CategoriaComponent.css";

class CategoriaComponent extends Component {
  render() {
    return (
      <>
        <div className="container-categoria ">
          <h1 className="nome">{this.props.nome || "categoria produto"}</h1>
          <div className="lista-item">{this.props.children}</div>
        </div>
      </>
    );
  }
}

export default CategoriaComponent;
