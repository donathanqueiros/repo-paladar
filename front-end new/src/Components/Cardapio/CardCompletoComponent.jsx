import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";
import React, { useEffect, useState } from "react";
import CardCarrinhoComponent from "./CardCarrinhoComponent";
import iconFechar from "../../assets/img/fechar.png";
import { Image } from "react-bootstrap";
import FinalizarCompraComponent from "./FinalizarCompraComponent ";

const CardCompletoComponent = ({
  titulo,
  subtitulo,
  preco,
  src,
  closeModal,
  qtd,
  add,
  remove,
}) => {
  const { insani, mont } = fontFamily;
  const { black, red } = colors;
  const { small } = fontSize;

  const imgStyle = {
    width: 387 * 1.5,
    height: 224 * 1.5,
    borderRadius: "40px 40px 40px 40px",
  };

  const tituloHeaderStyle = {
    marginLeft: "40%",
    height: "90px",
    ...insani,
    fontSize: "42px",
    lineHeight: "41px",
    textAlign: "center",

    ...red,
  };

  const tituloStyle = {
    ...insani,
    fontSize: "32px",
    lineHeight: "41px",
    textAlign: "center",
    ...red,
  };

  const subtituloStyle = {
    margin: "auto",
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

  const geralStyle = {
    width: "794px",
    backgroundColor: "#FFFFFFF",
  };

  const cardStyle = {
    marginTop: "8px",
    width: "100%",
  };
  const descricao = {
    ...mont,
    ...black,
    height: "29px",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
  };

  return (
    <div style={geralStyle} className="d-flex flex-column align-items-center">
      <header
        style={{
          width: "100%",
          height: "90px",
          background: "#FDDC00",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
          borderRadius: "80px 80px 0px 0px",
        }}
        className="d-flex  justify-content-center  "
      >
        <span
          style={tituloHeaderStyle}
          className="d-flex align-items-center justify-content-center"
        >
          DETALHES
        </span>
        <div
          className="d-flex  align-items-center"
          style={{ marginLeft: "auto", marginRight: "56px", cursor: "pointer" }}
          onClick={closeModal}
        >
          <Image
            style={{
              width: "42px",
              height: "42px",
            }}
            src={iconFechar}
          />
        </div>
      </header>
      <body
        style={{ padding: "24px 0", width: "100%", minHeight: "400px" }}
        className="d-flex flex-column align-items-center"
      >
        <div style={{ maxWidth: 387 * 1.5 }}>
          <Image style={imgStyle} src={src}></Image>
          <div style={{ padding: "8px 8px", paddingTop: "8px" }}>
            <span style={tituloStyle}>{titulo}</span>
          </div>
          <div style={{ padding: "0px 8px" }}>
            <span style={subtituloStyle}>{subtitulo}</span>
          </div>
          <div
            style={{ padding: "0px 8px", paddingTop: "8px" }}
            className="d-flex flex-row justify-content-between align-items-end"
          >
            <div>
              <span style={precoStyle}>R$ {parseFloat(preco).toFixed(2)}</span>
            </div>
            <div>
              <BotaoCardComponent
                qtd={qtd}
                increment={add}
                decrement={remove}
              />
            </div>
          </div>
        </div>
      </body>

      <footer
        style={{
          width: "794px",
          height: "90px",
          background: "#FDDC00",
          boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.15)",
          borderRadius: "0px 0px 80px 80px",
        }}
      ></footer>
    </div>
  );
};

export default CardCompletoComponent;
