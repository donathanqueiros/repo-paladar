import React, { useState } from "react";
import { Image } from "react-bootstrap";
import Menos from "../../assets/img/menos.svg";
import Mais from "../../assets/img/mais.svg";
import { colors, fontFamily } from "../../assets/css/Style";

const BotaoCardComponent = ({ style, qtd, increment, decrement }) => {
  const [quantidade, setQuantidade] = useState(0);
  const { black } = colors;
  const { mont } = fontFamily;

  const geralStyle = {
    width: "72px",
    height: "24px",
    backgroundColor: "#000000",
  };
  const menosStyle = {
    cursor: "pointer",
    width: "24px",
    height: "24px",
    backgroundColor: "#008000",
  };
  const numeroStyle = {
    fontFamily: mont["fontFamily"],
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "24px",
    color: black["color"],

    width: "24px",
    height: "24px",
    backgroundColor: "#FFF",
  };
  const maisStyle = {
    cursor: "pointer",
    width: "24px",
    height: "24px",
    backgroundColor: "#FF0000",
  };

  return (
    <div
      id="botao-card"
      style={{ ...geralStyle, ...style }}
      className="d-flex flex-row"
    >
      <div
        style={menosStyle}
        className="justify-content-center text-center"
        onClick={decrement}
      >
        <Image src={Menos}></Image>
      </div>
      <div style={numeroStyle} className="justify-content-center text-center">
        <span>{qtd}</span>
      </div>
      <div
        style={maisStyle}
        className="justify-content-center text-center"
        onClick={increment}
      >
        <Image src={Mais}></Image>
      </div>
    </div>
  );
};

export default BotaoCardComponent;
