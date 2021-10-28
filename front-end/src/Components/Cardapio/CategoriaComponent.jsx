import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import LabelComponent from "./LabelComponent";

const CategoriaComponent = ({ children, titulo, linha, mobile }) => {
  const [lg, setLg] = useState(4);
  const [md, setMd] = useState(6);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 1190 && lg != 6) {
      setLg(6);
    }
    if (width >= 1190 && lg != 4) {
      setLg(4);
    }

    if (width < 800 && md != 12) {
      setMd(12);
    }
    if (width >= 800 && md != 6) {
      setMd(6);
    }
  }, [width]);

  return (
    <Container fluid>
      <Row>
        <LabelComponent
          titulo={titulo}
          linha={linha}
          mobile={mobile}
        ></LabelComponent>
      </Row>
      <Row className="d-flex ">
        {React.Children.map(children, (child) => {
          if (child != null) {
            return (
              <Col
                xl={4}
                lg={lg}
                md={md}
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
