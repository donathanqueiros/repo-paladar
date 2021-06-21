import React, { Component } from "react";
import "./HeaderComponent.css";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <h1>{this.props.nome || "nome estabelecimento"}</h1>
        <div>{this.props.children}</div>
      </header>
    );
  }
}

export default HeaderComponent;
