import { Button, Col, Row } from "antd";
import React, { Component } from "react";
import "./ItemCategoriaComponent.css";

class ItemCategoriaComponent extends Component {
  render() {
    return (
      <>
        <div className="container-item">
          <div className="info-item">
            <h1 className="nome-item">
              {this.props.nome || "pizza, frango e catupiry"}
            </h1>
            <p className="desc-item">{this.props.descricao || "descricao"}</p>

            <Row>
              <Col span={4}>
                <h2 className="preco-item">{this.props.preco || "0.00"}</h2>
              </Col>
              <Col span={4}>
                <Button>+</Button>
              </Col>
              <Col span={16} offset={16}>
                <Button>-</Button>
              </Col>
            </Row>
          </div>

          <div className="div-img-item">
            {/* <img className="img-item" src={this.props.img || null} alt="" srcset=""/> */}
          </div>
        </div>
      </>
    );
  }
}

export default ItemCategoriaComponent;
