import React, { Component } from "react";
import "./BannerComponent.css";

class BannerComponent extends Component {
  render() {
    return (
      <div className="container-banner">
        <img
          width={700}
          className="center"
          src="https://milkmellow.com.br/wp-content/uploads/2021/01/Os-Principais-Lanches-Brasileiros-1.jpg"
        ></img>
      </div>
    );
  }
}

export default BannerComponent;
