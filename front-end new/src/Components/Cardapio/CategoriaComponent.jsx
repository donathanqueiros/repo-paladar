import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LabelComponent from "./LabelComponent";

const CategoriaComponent = ({ children, titulo }) => {
  return (
    <div>
      <LabelComponent titulo={titulo} linha></LabelComponent>
      <Container fluid>
        <Row>
          {React.Children.map(children, (child) => {
            return (
              <Col
                xl="4"
                lg="6"
                md="6"
                className="d-flex justify-content-center"
              >
                {child}
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default CategoriaComponent;
