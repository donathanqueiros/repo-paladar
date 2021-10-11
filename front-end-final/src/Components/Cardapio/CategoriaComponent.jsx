import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LabelComponent from "./LabelComponent";

const CategoriaComponent = ({ children, titulo, linha, mobile }) => {
  return (
    <Container fluid>
      <Row>
        <LabelComponent
          titulo={titulo}
          linha={linha}
          mobile={mobile}
        ></LabelComponent>
      </Row>
      <Row>
        {React.Children.map(children, (child) => {
          if (child != null) {
            return (
              <Col
                xl="4"
                lg="4"
                md="6"
                className="d-flex justify-content-center"
              >
                {child}
              </Col>
            );
          }
        })}
      </Row>
    </Container>
  );
};

export default CategoriaComponent;
