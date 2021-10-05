/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useContext } from "react";
import logo from "../../assets/img/logo.png";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import carrinho from "../../assets/img/carrinho.png";
import { Col, Container, Image, Row } from "react-bootstrap";
import { ModalContext } from "../../context/ModalContext";

const HeaderComponent = ({ mobile }) => {
  const [openModal] = useContext(ModalContext);
  const { red, yellow } = colors;
  const { insani } = fontFamily;
  const { big } = fontSize;

  const styleHeader = {
    position: "relative",
    zIndex: "1",
    maxWidth: "1232px",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    minHeight: "90px",
    backgroundColor: yellow["color"],
  };

  const Mobile = () => {
    return (
      <Container css={styleHeader}>
        <Container>
          <Row className="d-flex justify-content-center ">
            <img src={logo}></img>
          </Row>
          <Row className="d-flex justify-content-center ">
            <span style={{ ...red, ...insani, ...big }}>CARDAPIO</span>
          </Row>
        </Container>
      </Container>
    );
  };

  function Desktop() {
    return (
      <Container css={styleHeader}>
        <Row>
          <Col className="d-flex justify-content-start align-items-center">
            <img src={logo}></img>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <span style={{ ...red, ...insani, ...big }} className="texto">
              CARDAPIO
            </span>
          </Col>
          <Col
            md="4"
            className="d-flex justify-content-end align-items-center "
          >
            <Image
              src={carrinho}
              className="cursor-pointer"
              onClick={openModal}
            ></Image>
          </Col>
        </Row>
      </Container>
    );
  }

  return mobile ? <Mobile /> : <Desktop />;
};

export default HeaderComponent;
