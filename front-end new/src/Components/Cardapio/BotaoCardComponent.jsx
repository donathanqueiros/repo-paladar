import React, { useState } from "react";
import { Image } from "react-bootstrap";
import Menos from "../../assets/img/menos.svg";
import Mais from "../../assets/img/mais.svg";
import { colors, fontFamily } from "../../assets/css/Style";

const BotaoCardComponent = () => {
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

  const adicionar = () => setQuantidade(quantidade + 1);
  const remover = () => quantidade > 0 && setQuantidade(quantidade - 1);

  return (
    <div style={geralStyle} className="d-flex flex-row">
      <div
        style={menosStyle}
        className="justify-content-center text-center"
        onClick={remover}
      >
        <Image src={Menos}></Image>
      </div>
      <div style={numeroStyle} className="justify-content-center text-center">
        <span>{quantidade}</span>
      </div>
      <div
        style={maisStyle}
        className="justify-content-center text-center"
        onClick={adicionar}
      >
        <Image src={Mais}></Image>
      </div>
    </div>
  );
};

export default BotaoCardComponent;
