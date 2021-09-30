import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";
import CardCompletoComponent from "./CardCompletoComponent";
import CarrinhoComponent from "./CarrinhoComponent";
import ModalComponent from "./ModalComponent";
import $ from "jquery";

const CardGrandeComponent = ({
  titulo,
  subtitulo,
  preco,
  src,
  qtd,
  add,
  remove,
}) => {
  const { mont } = fontFamily;
  const { small } = fontSize;
  const { red, black } = colors;

  const cardStyle = {
    marginTop: "40px",
    width: "387px",
    height: "400px",
    cursor: "pointer",
    // filter: "drop-shadow(10px 10px 30px rgba(0, 0, 0, 0.15))",

    MozBoxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    WebkitBoxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
  };
  const imgStyle = {
    width: "387px",
    height: "224px",
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

  const subtituloStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "4",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "371px",
    height: "65px",
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

  const [showCardCompleto, setShowCardCompleto] = useState(false);

  const produtoDetalhes = () => {
    setShowCardCompleto(true);
  };

  return (
    <>
      <div style={cardStyle} className="d-flex flex-column">
        <Image onClick={produtoDetalhes} style={imgStyle} src={src}></Image>
        <div
          onClick={produtoDetalhes}
          style={{ padding: "0px 8px", paddingTop: "8px" }}
        >
          <span style={tituloStyle}>{titulo}</span>
        </div>
        <div onClick={produtoDetalhes} style={{ padding: "0px 8px" }}>
          <span style={subtituloStyle}>{subtitulo}</span>
        </div>
        <div
          style={{ padding: "0px 16px", paddingTop: "8px" }}
          className="d-flex flex-row justify-content-between align-items-end"
        >
          <div>
            <span style={precoStyle}>R$ {parseFloat(preco).toFixed(2)}</span>
          </div>
          <div>
            <BotaoCardComponent qtd={qtd} increment={add} decrement={remove} />
          </div>
        </div>
      </div>
      <ModalComponent
        // onHide={() => setShowCardCompleto(false)}
        show={showCardCompleto}
      >
        <CardCompletoComponent
          // closeModal={() => setShowCardCompleto(false)}
          titulo={titulo}
          subtitulo={subtitulo}
          preco={preco}
          src={src}
          qtd={qtd}
          add={add}
          remove={remove}
        />
      </ModalComponent>
    </>
  );
};

export default CardGrandeComponent;
