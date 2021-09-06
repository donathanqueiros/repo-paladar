import React from "react";
import { Image } from "react-bootstrap";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";

const CardCarrinhoComponent = ({ titulo, preco, src }) => {
  const { mont } = fontFamily;
  const { small } = fontSize;
  const { red, black } = colors;

  const cardStyle = {
    width: "590px",
    height: "138px",
    cursor: "pointer",
    // filter: "drop-shadow(10px 10px 30px rgba(0, 0, 0, 0.15))",

    MozBoxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    WebkitBoxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
  };
  const textStyle = {
    marginLeft: "8px",
    marginTop: "8px",
    marginRight: "8px",
    width: "200px",
    height: "180px",
  };
  const imgStyle = {
    width: "138px",
    height: "138px",
  };
  const tituloStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "420px",
    height: "44px",
    fontWeight: 700,
    lineHeight: "20px",
    ...black,
    ...mont,
    fontSize: "20px",
    fontStyle: "normal",
  };

  const precoStyle = {
    ...mont,
    fontStyle: "normal",
    fontWeight: "bold",
    ...small,
    lineHeight: "29px",
    ...red,
  };

  return (
    <div style={cardStyle} className="d-flex flex-row">
      <Image style={imgStyle} src={src}></Image>
      <div style={textStyle} className="flex-col ">
        <span style={tituloStyle}>{titulo}</span>
        <div
          style={{ paddingTop: "8px" }}
          className="d-flex flex-row justify-content-between align-items-end"
        >
          <div>
            <span style={precoStyle}>R$ {parseFloat(preco).toFixed(2)}</span>
          </div>
          <div>
            <BotaoCardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCarrinhoComponent;
