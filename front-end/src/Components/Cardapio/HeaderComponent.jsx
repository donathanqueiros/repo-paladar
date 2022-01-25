import React, { useContext } from "react";
import logo from "../../assets/img/logo.png";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import carrinho from "../../assets/img/carrinho.png";
import { Col, Container, Image, Row } from "react-bootstrap";
import { MobileContext } from "../../context/MobileContext";
import styled from "styled-components";

const { red, yellow } = colors;
const { insani } = fontFamily;
const { big } = fontSize;
const HeaderComponent = ({ showModal }) => {
  const [isMobile] = useContext(MobileContext);

  return (
    <SyledContainer fluid>
      <Row>
        <Col
          md={4}
          className={
            "d-flex justify-content-start " +
            (isMobile ? "justify-content-center" : "")
          }
        >
          <img src={logo}></img>
        </Col>
        <Col
          md={4}
          className="d-flex justify-content-center align-items-center "
        >
          <span style={{ ...red, ...insani, ...big }}>CARDAPIO</span>
        </Col>

        {!isMobile && (
          <Col md={4} className="d-flex justify-content-end align-items-center">
            <Image
              src={carrinho}
              className="cursor-pointer"
              onClick={showModal}
            />
          </Col>
        )}
      </Row>
    </SyledContainer>
  );
};

const SyledContainer = styled(Container)`
  ${{
    zIndex: "1",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    minHeight: "90px",
    backgroundColor: yellow["color"],
  }}
`;

export default HeaderComponent;
