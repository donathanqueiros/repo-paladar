import React from "react";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import { Col, Container, Row } from "react-bootstrap";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const LabelComponent = ({ titulo, linha, mobile }) => {
  const { yellow, red } = colors;
  const { insani } = fontFamily;
  const { big } = fontSize;

  const linhaStyle = {
    position: "absolute",
    left: "-122px",
    width: "100vw",
    height: "2px",
    backgroundColor: red.color,
  };

  if (titulo === undefined || titulo === "") titulo = "teste";

  const gerarLinha = () => {
    if (linha) {
      return <div style={linhaStyle}></div>;
    }
  };

  function Desktop() {
    return (
      <Container style={{ paddingTop: "40px" }} className="d-flex flex-column">
        <Row>
          <span
            style={{
              ...insani,
              ...big,
              ...yellow,
              paddingLeft: "8px",
              lineHeight: "48px",
            }}
          >
            {titulo}
          </span>
        </Row>
        <Row
          style={{
            position: "relative",
          }}
        >
          {gerarLinha()}
        </Row>
      </Container>
    );
  }

  function Mobile() {
    return (
      <Container style={{ paddingTop: "40px" }} className="d-flex flex-column">
        <Row className="justify-content-center">
          <span
            style={{
              ...insani,
              ...big,
              ...yellow,
              paddingLeft: "8px",
              lineHeight: "48px",
            }}
          >
            {titulo}
          </span>
        </Row>
        <Row style={{}}>
          <Col
            style={{
              width: "100vw",
              height: "2px",
              backgroundColor: red.color,
            }}
          ></Col>
        </Row>
      </Container>
    );
  }

  return <>{mobile ? <Mobile /> : <Desktop />}</>;
};

export default LabelComponent;
