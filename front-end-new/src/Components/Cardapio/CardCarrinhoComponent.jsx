import React from "react";
import { Image, Container } from "react-bootstrap";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";
import BotaoCardComponent from "./BotaoCardComponent";

const CardCarrinhoComponent = ({ titulo, preco, src, qtd, add, remove }) => {
  const { mont } = fontFamily;
  const { small, big, medium } = fontSize;
  const { red, black } = colors;

  const cardStyle = {
    width: "100%",
    maxWidth: "590px",
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
    width: "100%",
  };
  const imgStyle = {
    width: "138px",
    height: "138px",
  };
  const tituloStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%",
    fontWeight: 700,
    lineHeight: "28px",
    ...black,
    ...mont,
    ...small,
    fontStyle: "normal",
    marginTop: "8px",
  };

  const precoStyle = {
    ...mont,
    fontStyle: "normal",
    fontWeight: "bold",
    ...small,
    lineHeight: "24px",
    ...red,
  };

  return (
    <Container fluid style={cardStyle} className="d-flex flex-row">
      <Image style={imgStyle} src={src}></Image>
      <div
        style={textStyle}
        className="d-flex flex-column justify-content-between"
      >
        <span style={tituloStyle}>{titulo}</span>
        <div
          style={{ paddingTop: "8px", marginBottom: "8px" }}
          className="d-flex flex-row justify-content-between align-items-end"
        >
          <div>
            <span style={precoStyle}>R$ {parseFloat(preco).toFixed(2)}</span>
          </div>
          <div>
            <BotaoCardComponent
              style={{ marginBottom: "4px" }}
              qtd={qtd}
              increment={add}
              decrement={remove}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CardCarrinhoComponent;
