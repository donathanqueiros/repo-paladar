import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";
import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import iconFechar from "../../assets/img/fechar.png";
import { Image } from "react-bootstrap";
import { MobileContext } from "../../context/MobileContext";
import styled from "styled-components";

const CardCompletoComponent = ({
  titulo,
  subtitulo,
  preco,
  src,
  closeModal,
  qtd,
  add,
  remove,
}) => {
  const { insani, mont } = fontFamily;
  const { red } = colors;
  const { small } = fontSize;

  const imgStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "40px 40px 40px 40px",
  };

  const tituloStyle = {
    ...insani,
    fontSize: "32px",
    lineHeight: "41px",
    ...red,
  };

  const subtituloStyle = {
    margin: "auto",
    ...mont,
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "16px",
    color: "rgba(0, 0, 0, 0.4)",
  };

  const precoStyle = {
    ...mont,
    fontStyle: "normal",
    fontWeight: "bold",
    ...small,
    lineHeight: "29px",
    ...red,
  };

  return (
    <StyledContainer fluid>
      <Header>
        <Col
          xs={{ offset: 3, span: 6 }}
          className="d-flex justify-content-center align-items-center"
        >
          <span style={tituloStyle}>DETALHES</span>
        </Col>

        <Col className="d-flex justify-content-center align-items-center ">
          <Image
            style={{
              cursor: "pointer",
              width: "42px",
              height: "42px",
            }}
            onClick={closeModal}
            src={iconFechar}
          />
        </Col>
      </Header>
      <Body className="d-flex flex-column align-items-center">
        <Container fluid style={{ maxWidth: 580 }}>
          <Row>
            <div
              className="d-flex flex-row justify-content-center align-items-end"
              style={{ width: "100%", maxHeight: "400px" }}
            >
              <Image style={imgStyle} src={src} />
            </div>
          </Row>
          <Row>
            <div>
              <span style={tituloStyle}>{titulo}</span>
            </div>
            <div>
              <span style={subtituloStyle}>{subtitulo}</span>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-end">
              <div>
                <span style={precoStyle}>
                  R$ {parseFloat(preco).toFixed(2)}
                </span>
              </div>
              <div>
                <BotaoCardComponent
                  qtd={qtd}
                  increment={add}
                  decrement={remove}
                />
              </div>
            </div>
          </Row>
        </Container>
      </Body>

      <Footer />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  max-width: 794px;

  @media (max-width: 794px) {
    padding: 0px 24px;
  }
`;
const Header = styled(Row)`
  position: relative;
  height: 90px;
  background: #fddc00;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 80px 80px 0px 0px;

  @media (max-width: 794px) {
    border-radius: 0px 0px 0px 0px;
  }
`;
const Body = styled(Row)`
  padding: 24px 0;
  background-color: white;
`;

const Footer = styled(Row)`
  height: 90px;
  background: #fddc00;
  box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 80px 80px;

  @media (max-width: 794px) {
    border-radius: 0px;
  }
`;

export default CardCompletoComponent;
