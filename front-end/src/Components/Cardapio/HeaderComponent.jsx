import React, { useContext } from "react";
import logo from "../../assets/img/logo.png";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import carrinho from "../../assets/img/carrinho.png";
import { Col, Container, Image, Row } from "react-bootstrap";
import { MobileContext } from "../../context/MobileContext";

const HeaderComponent = ({ showModal }) => {
  const { red, yellow } = colors;
  const { insani } = fontFamily;
  const { big } = fontSize;
  const [isMobile] = useContext(MobileContext);

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
      <Container fluid style={styleHeader}>
        <Row className="d-flex justify-content-center ">
          <img style={{ width: 183, height: "90px" }} src={logo}></img>
        </Row>
        <Row>
          <span
            className="d-flex justify-content-center "
            style={{ ...red, ...insani, ...big }}
          >
            CARDAPIO
          </span>
        </Row>
      </Container>
    );
  };

  function Desktop() {
    return (
      <Container style={styleHeader}>
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
              onClick={showModal}
            ></Image>
          </Col>
        </Row>
      </Container>
    );
  }

  return isMobile ? Mobile() : Desktop();
};

export default HeaderComponent;
