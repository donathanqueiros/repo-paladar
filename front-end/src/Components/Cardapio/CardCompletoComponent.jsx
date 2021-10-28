import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";
import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import iconFechar from "../../assets/img/fechar.png";
import { Image } from "react-bootstrap";
import { MobileContext } from "../../context/MobileContext";

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
  const [isMobile] = useContext(MobileContext);

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

  function Desktop() {
    return (
      <Container
        fluid
        style={{
          maxWidth: "794px",
        }}
        // className="d-flex flex-column align-items-center"
      >
        <Row
          style={{
            position: "relative",
            height: "90px",
            background: "#FDDC00",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
            borderRadius: "80px 80px 0px 0px",
          }}
        >
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
        </Row>
        <Row
          style={{
            padding: "24px 0",
            minHeight: "400px",
            backgroundColor: "white",
          }}
          className="d-flex flex-column align-items-center"
        >
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
              <div style={{ padding: "8px 8px", paddingTop: "8px" }}>
                <span style={tituloStyle}>{titulo}</span>
              </div>
              <div style={{ padding: "0px 8px" }}>
                <span style={subtituloStyle}>{subtitulo}</span>
              </div>
              <div
                style={{ padding: "0px 8px", paddingTop: "8px" }}
                className="d-flex flex-row justify-content-between align-items-end"
              >
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
        </Row>

        <Row
          style={{
            height: "90px",
            background: "#FDDC00",
            boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.15)",
            borderRadius: "0px 0px 80px 80px",
          }}
        />
      </Container>
    );
  }

  function Mobile() {
    return (
      <Container fluid style={{ backgroundColor: "white", minHeight: "100vh" }}>
        <Row
          style={{
            position: "relative",
            height: "90px",
            background: "#FDDC00",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Col
            xs={{ span: 6, offset: 3 }}
            style={{
              ...insani,
              fontSize: "42px",
              lineHeight: "41px",
              ...red,
            }}
            className="d-flex justify-content-center align-items-center"
          >
            DETALHES
          </Col>
          <Col
            className="d-flex justify-content-center align-items-center"
            onClick={closeModal}
          >
            <Image
              style={{
                cursor: "pointer",
                width: "42px",
                height: "42px",
              }}
              src={iconFechar}
            />
          </Col>
        </Row>
        <Row
          style={{
            padding: "24px 0",
            maxWidth: "500px",
            minHeight: "calc(100vh - 180px)",
            margin: "0 auto",
          }}
          className="d-flex flex-column justify-content-start align-items-center"
        >
            <Row>
              <div
                className="d-flex flex-row justify-content-center align-items-end"
                style={{ width: "100%", maxHeight: "400px" }}
              >
                <Image
                  style={{
                    borderRadius: "40px 40px 40px 40px",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  src={src}
                />
              </div>
            </Row>
          <Row>
            <Row style={{ marginTop: "8px" }}>
              <span style={tituloStyle}>{titulo}</span>
            </Row>
            <Row style={{ marginTop: "4px" }}>
              <span style={subtituloStyle}>{subtitulo}</span>
            </Row>
            <Row style={{ marginTop: "32px" }}>
              <Col>
                <span style={precoStyle}>
                  R$ {parseFloat(preco).toFixed(2)}
                </span>
              </Col>
              <Col className="d-flex justify-content-end ">
                <BotaoCardComponent
                  qtd={qtd}
                  increment={add}
                  decrement={remove}
                />
              </Col>
            </Row>
          </Row>
        </Row>

        <Row
          style={{
            position: "relative",
            height: "90px",
            background: "#FDDC00",
            boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.15)",
          }}
        ></Row>
      </Container>
    );
  }

  return <>{isMobile ? Mobile() : Desktop()}</>;
};

export default CardCompletoComponent;
