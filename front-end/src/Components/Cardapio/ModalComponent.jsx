import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

const ModalComponent = ({ styleModal, show, onHide, children }) => {
  const [modalStyleDefault, setModalStyleDefault] = useState({
    display: "none",
    position: "fixed",
    zIndex: "2",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    padding: "0px",
    margin: "0px",
    backgroundColor: "rgba(17, 0, 17, 0.4)",
  });

  const onHideHandler = (e) => {
    var modal = document.getElementById("modal");
    var ev = e || window.event;
    if (e.target !== modal) return;
    return onHide();
  };

  useEffect(() => {
    let { display } = modalStyleDefault;
    show ? (display = "block") : (display = "none");
    setModalStyleDefault({ ...modalStyleDefault, display });
  }, [show]);

  return (
    <Container
      fluid
      onClick={onHideHandler}
      id="modal"
      style={Object.assign(modalStyleDefault, styleModal)}
    >
      <Row>{children}</Row>
    </Container>
  );
};

export default ModalComponent;
