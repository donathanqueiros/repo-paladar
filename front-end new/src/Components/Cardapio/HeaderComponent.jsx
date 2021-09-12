import React from "react";
import logo from "../../assets/img/logo.png";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import carrinho from "../../assets/img/carrinho.png";
import { Col, Container, Image, Row } from "react-bootstrap";

const HeaderComponent = ({ modalCarrinho }) => {
  const { red, yellow } = colors;
  const { insani } = fontFamily;
  const { big } = fontSize;

  const styleContent = { maxWidth: "1232px", margin: "auto" };
  const styleHeader = {
    position: "relative",
    zIndex: "2",
    width: "100%",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    height: "90px",
    backgroundColor: yellow["color"],
  };

  return (
    <header style={styleHeader}>
      <Container style={styleContent} fluid>
        <Row>
          <Col
            md="4"
            className="d-flex justify-content-start align-items-center"
          >
            <img src={logo}></img>
          </Col>
          <Col
            md="4"
            className="d-flex justify-content-center align-items-center"
          >
            <span style={{ ...red, ...insani, ...big }} className="texto">
              CARDAPIO
            </span>
          </Col>
          <Col md="4" className="d-flex justify-content-end align-items-center ">
            <Image src={carrinho} className="cursor-pointer" onClick={() => modalCarrinho()} ></Image>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default HeaderComponent;
