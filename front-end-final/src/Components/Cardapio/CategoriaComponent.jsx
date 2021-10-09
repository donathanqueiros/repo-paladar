import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LabelComponent from "./LabelComponent";

const CategoriaComponent = ({
  key,
  chave,
  children,
  titulo,
  linha,
  mobile,
}) => {
  var i = 1;
  useEffect(() => {
    console.log("chamou did");
  }, []);
  return (
    <Container key={chave} fluid>
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
                key={key + "-" + i++}
                xl="4"
                lg="6"
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
