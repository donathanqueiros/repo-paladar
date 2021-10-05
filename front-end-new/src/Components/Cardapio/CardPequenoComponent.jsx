import React, { Component, useEffect, useState } from "react";
import { Image, Container } from "react-bootstrap";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";
import CardCompletoComponent from "./CardCompletoComponent";
import ModalComponent from "./ModalComponent";

const CardPequenoComponent = ({
  chave,
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

  const srcStatic = src;

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

  const [show, setShow] = useState(false);

  const produtoDetalhes = (e) => {
    setShow(true);
  };

  return (
    <Container Key={chave}>
      <div Key={chave} style={cardStyle} className="d-flex flex-row">
        <Image
          onClick={produtoDetalhes}
          style={imgStyle}
          src={srcStatic}
        ></Image>
        <div style={textStyle} className="flex-col ">
          <span onClick={produtoDetalhes} style={tituloStyle}>
            {titulo}
          </span>
          <div onClick={produtoDetalhes} style={subtituloStyle}>
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
              <BotaoCardComponent
                teste={chave}
                qtd={qtd}
                increment={add}
                decrement={remove}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <ModalComponent
        onHide={() => setShow(false)}
        className="zindex-modal"
        show={show}
      >
        <CardCompletoComponent
          mobile={mobile}
          closeModal={() => setShow(false)}
          titulo={titulo}
          subtitulo={subtitulo}
          preco={preco}
          src={src}
          qtd={qtd}
          add={add}
          remove={remove}
        />
      </ModalComponent> */}
    </Container>
  );
};

export default CardPequenoComponent;
