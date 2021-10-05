import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import iconFechar from "../../assets/img/fechar.png";
import { Image } from "react-bootstrap";

const CardCompletoComponent = ({
  titulo,
  subtitulo,
  preco,
  src,
  closeModal,
  qtd,
  add,
  remove,
  mobile = true,
}) => {
  const { insani, mont } = fontFamily;
  const { red } = colors;
  const { small } = fontSize;

  const imgStyle = {
    width: 387 * 1.5,
    height: 224 * 1.5,
    borderRadius: "40px 40px 40px 40px",
  };

  const tituloHeaderStyle = {
    marginLeft: "40%",
    ...insani,
    fontSize: "42px",
    lineHeight: "41px",
    textAlign: "center",

    ...red,
  };

  const tituloStyle = {
    ...insani,
    fontSize: "32px",
    lineHeight: "41px",
    textAlign: "center",
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
          width: "794px",
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
          className="d-flex  justify-content-center  "
        >
          <span
            style={tituloHeaderStyle}
            className="d-flex align-items-center justify-content-center"
          >
            DETALHES
          </span>
          <div
            className="d-flex  align-items-center"
            style={{
              marginLeft: "auto",
              marginRight: "56px",
              cursor: "pointer",
            }}
            onClick={closeModal}
          >
            <Image
              style={{
                width: "42px",
                height: "42px",
              }}
              src={iconFechar}
            />
          </div>
        </Row>
        <Row
          style={{
            padding: "24px 0",
            minHeight: "400px",
            backgroundColor: "white",
          }}
          className="d-flex flex-column align-items-center"
        >
          <div style={{ maxWidth: 387 * 1.5 }}>
            <Image style={imgStyle} src={src}></Image>
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
          </div>
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
      <Container fluid style={{ backgroundColor: "white" }}>
        <Row
          style={{
            position: "relative",
            height: "90px",
            background: "#FDDC00",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Col
            xs={{ span: 7, offset: 2 }}
            style={{
              ...insani,
              fontSize: "42px",
              lineHeight: "41px",
              ...red,
            }}
            className="d-flex align-items-center"
          >
            DETALHES
          </Col>
          <Col className="d-flex align-items-center" onClick={closeModal}>
            <Image
              style={{
                width: "42px",
                height: "42px",
              }}
              src={iconFechar}
            />
          </Col>
        </Row>
        <Row
          style={{ padding: "24px 0", minHeight: "600px" }}
          className="d-flex flex-column align-items-center"
        >
          <div style={{ maxWidth: 387 * 1.5 }}>
            <Image
              style={{
                width: 387,
                height: 224,
                borderRadius: "40px 40px 40px 40px",
              }}
              src={src}
            ></Image>
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
          </div>
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

  return <>{mobile ? <Mobile /> : <Desktop />}</>;
};

export default CardCompletoComponent;
