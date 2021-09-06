import React from "react";
import { Image } from "react-bootstrap";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";

const CardGrandeComponent = ({ titulo, subtitulo, preco, src }) => {
  const { mont } = fontFamily;
  const { small } = fontSize;
  const { red, black } = colors;

  const cardStyle = {
    marginTop: "40px",
    width: "387px",
    height: "180px",
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
    width: "180px",
    height: "180px",
  };
  const tituloStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    height: "40px",
    fontWeight: 700,
    lineHeight: "20px",
    ...black,
    ...mont,
    fontSize: "20px",
    fontStyle: "normal",
  };

  const subtituloStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "5",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",

    marginTop: "8px",
    height: "80px",
    ...mont,
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "16px",
    color: "rgba(0, 0, 0, 0.4)",
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
        <div style={subtituloStyle}>
          <span>{subtitulo}</span>
        </div>
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

export default CardGrandeComponent;
