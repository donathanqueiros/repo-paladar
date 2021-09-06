import React, { useEffect, useState } from "react";
import { colors, fontFamily } from "../../assets/css/Style";
import CardCarrinhoComponent from "./CardCarrinhoComponent";
import iconFechar from "../../assets/img/fechar.png";
import { Image } from "react-bootstrap";
import FinalizarCompraComponent from "./FinalizarCompraComponent ";

const CarrinhoComponent = ({ carrinho, closeModal }) => {
  const [finalizar, setFinalizar] = useState(false);

  const geralStyle = {
    width: "794px",
    backgroundColor: "#FFFFFFF",
  };
  const { insani, mont } = fontFamily;
  const { black, red } = colors;

  const [totalProduto, setTotalProduto] = useState(0);
  const [taxaEntrega, setTaxaEntrega] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

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
  const preco = {
    height: "29px",
    ...mont,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
    ...red,
    opacity: 0.8,
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
  const tituloStyle = {
    marginLeft: "auto",
    height: "90px",
    ...insani,
    fontSize: "36px",
    lineHeight: "41px",
    textAlign: "center",

    ...red,
  };

  const CarrinhoComp = () => {
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
          <span style={tituloStyle}>
            meu <br />
            carrinho
          </span>
          <div style={{ marginLeft: "auto" }}>
            <Image
              style={{
                width: "42px",
                height: "42px",
              }}
              src={iconFechar}
            />
          </div>
        </header>
        <body style={{ padding: "24px 0", width: "100%" }}>
          <div
            style={{
              margin: "auto",
            }}
            className="d-flex flex-column align-items-center"
          >
            <div>
              <CardCarrinhoComponent
                titulo="Coxinha de frango com catupiry"
                preco="20"
                src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
              />
            </div>
            <div style={{ marginTop: "8px" }}>
              <CardCarrinhoComponent
                titulo="Coxinha de frango com catupiry"
                preco="20"
                src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
              />
            </div>
            <div style={{ marginTop: "8px" }}>
              <CardCarrinhoComponent
                titulo="Coxinha de frango com catupiry"
                preco="20"
                src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
              />
            </div>

            <div style={{ width: "590px", marginTop: "48px" }}>
              <div className="d-flex justify-content-between">
                <span style={descricao}>Entrega?</span>
                <div
                  style={{
                    width: "80px",
                    height: "29px",
                    ...mont,
                  }}
                >
                  <select
                    style={{
                      width: "80px",
                      height: "29px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "29px",
                      color: "#202020",
                    }}
                  >
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "4px" }}
              >
                <span style={descricao}>Valor total dos produtos</span>
                <span style={preco}>
                  R$ {parseFloat(totalProduto).toFixed(2)}
                </span>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "4px" }}
              >
                <span style={descricao}>Taxa de entrega</span>
                <span style={preco}>
                  R$ {parseFloat(taxaEntrega).toFixed(2)}
                </span>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "4px" }}
              >
                <span style={descricao}>Subtotal</span>
                <span style={preco}>R$ {parseFloat(subtotal).toFixed(2)}</span>
              </div>

              <div
                className="d-flex justify-content-end"
                style={{ marginTop: "4px" }}
              >
                <div
                  className="d-flex flex-row justify-content-center align-items-center"
                  style={{
                    marginTop: "4px",
                    width: "174px",
                    height: "75px",
                    background: "#FDDC00",
                    boxShadow: "10px 10px 30px rgba(255, 203, 71, 0.3)",
                    borderRadius: "0px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setFinalizar(true);
                  }}
                >
                  <span
                    style={{
                      ...mont,
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#E1231D",
                    }}
                  >
                    Finalizar Compra
                  </span>
                </div>
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

  const isFinalizar = () => {
    console.log(finalizar);
    if (finalizar) {
      return (
        <FinalizarCompraComponent
          closeModal={closeModal}
        ></FinalizarCompraComponent>
      );
    } else {
      return <CarrinhoComp></CarrinhoComp>;
    }
  };

  return <>{isFinalizar()}</>;
};

export default CarrinhoComponent;
