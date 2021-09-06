import React, { useEffect, useState } from "react";
import { colors, fontFamily } from "../../assets/css/Style";

const ModalComponent = ({
  styleModal,
  styleContent,
  show,
  onHide,
  children,
}) => {
  const [contentStyleDefault, setContentStyleDefault] = useState({
    backgroundColor: "#fefefe",
    margin: "15% auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
  });
  const [modalStyleDefault, setModalStyleDefault] = useState({
    display: "none",
    position: "fixed",
    zIndex: 2,
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(17, 0, 17, 0.4)",
  });
  const { mont } = fontFamily;
  const { black } = colors;

  const cardStyle = {
    marginTop: "40px",
    width: "100%",
    height: "400px",
    cursor: "pointer",
    backgroundColor: "white",
    // filter: "drop-shadow(10px 10px 30px rgba(0, 0, 0, 0.15))",

    MozBoxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    WebkitBoxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
  };
  const tituloStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    height: "50px",
    ...black,
    ...mont,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "24px",
  };

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
    <div
      onClick={onHideHandler}
      id="modal"
      style={Object.assign(modalStyleDefault, styleModal)}
    >
      <div
        style={{
          margin: "auto",
          width: "60%",
        }}
      >
        {children}
      </div>
      {/* <div style={{ ...contentStyleDefault, ...styleContent }}>
      </div> */}
    </div>
  );
};

export default ModalComponent;
