import React from "react";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import facebook from "../../assets/img/facebook.png";
import instagram from "../../assets/img/instagram.png";
import whatsapp from "../../assets/img/whatsapp.png";
import { Col, Container, Image, Row } from "react-bootstrap";

const FooterComponent = () => {
  const { insani } = fontFamily;
  const { medium } = fontSize;
  const { red, yellow } = colors;
  const footerStyle = {
    position: "relative",
    zIndex: "2",
    height: "320px",
    backgroundColor: red.color,
  };
  const textStyle = { ...yellow, ...insani, ...medium };
  return (
    <footer style={footerStyle}>
      <Container style={{ paddingTop: "32px", width: "1232px" }}>
        <Row className="text-left">
          <Col xl="8">
            <span style={textStyle} className="">
              CONTATO: (14)3262-2901 / (14) 3262-7605
            </span>
            <br />
            <span style={textStyle}>TODOS OS DIAS. DAS 17H À 01H.</span>
          </Col>
          <Col xl="4">
            <div>
              <span style={textStyle}>REDES SOCIAIS:</span>
              <div>
                <Image
                  style={{ margin: "0 8px", cursor: "pointer" }}
                  src={instagram}
                ></Image>
                <Image
                  style={{ marginRight: "8px", cursor: "pointer" }}
                  src={whatsapp}
                ></Image>
                <Image style={{ cursor: "pointer" }} src={facebook}></Image>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
