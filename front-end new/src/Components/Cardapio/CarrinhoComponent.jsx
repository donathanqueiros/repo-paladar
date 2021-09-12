import React, { useEffect, useState } from "react";
import { colors, fontFamily } from "../../assets/css/Style";
import CardCarrinhoComponent from "./CardCarrinhoComponent";
import iconFechar from "../../assets/img/fechar.png";
import carrinhoImg from "../../assets/img/carrinho2.png";
import { Image } from "react-bootstrap";
import FinalizarCompraComponent from "./FinalizarCompraComponent ";
import $ from "jquery";

const CarrinhoComponent = ({ carrinho, closeModal, add, remove }) => {
  const [finalizar, setFinalizar] = useState(false);

  const geralStyle = {
    width: "794px",
    backgroundColor: "#FFFFFFF",
  };
  const { insani, mont } = fontFamily;
  const { black, red } = colors;

  const [totalProduto, setTotalProduto] = useState(0);
  const [taxaEntrega, setTaxaEntrega] = useState(5);
  useEffect(() => {
    setTotalProduto(
      carrinho.reduce(
        (acumulador, valorAtual) =>
          parseFloat(acumulador) + parseFloat(valorAtual.preco),
        0
      )
    );
  }, [carrinho]);

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
    marginLeft: "40%",
    height: "90px",
    ...insani,
    fontSize: "36px",
    lineHeight: "41px",
    textAlign: "center",

    ...red,
  };

  const selectHandle = (e) => {
    var teste = e.target.value;
    console.log(teste);
    setTimeout(() => {
      console.log(teste);
      teste === "Sim" ? setTaxaEntrega(5) : setTaxaEntrega(0);
    }, 100);
  };

  const mostrarDetalhes = () => {
    if (carrinho.length > 0) {
      return (
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
                name="taxaEntrega"
                id="taxaEntrega"
                onChange={selectHandle}
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
            <span style={preco}>R$ {parseFloat(totalProduto).toFixed(2)}</span>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ marginTop: "4px" }}
          >
            <span style={descricao}>Taxa de entrega</span>
            <span style={preco}>R$ {parseFloat(taxaEntrega).toFixed(2)}</span>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ marginTop: "4px" }}
          >
            <span style={descricao}>Subtotal</span>
            <span style={preco}>
              R$ {parseFloat(totalProduto + taxaEntrega).toFixed(2)}
            </span>
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
      );
    }
  };

  const CarrinhoVazio = () => {
    return (
      <div
        style={{ width: "100%", height: "100%" }}
        className="d-flex flex-column justify-content-center align-items-center "
      >
        <Image src={carrinhoImg} style={{ width: 200 }} />
        <span
          style={{
            ...insani,
            fontSize: "36px",
            lineHeight: "41px",
            textAlign: "center",

            color: "gray",
          }}
        >
          Carrinho Vazio
        </span>
      </div>
    );
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
          ''
          <div
            className="d-flex  align-items-center"
            style={{
              marginLeft: "auto",
              marginRight: "56px",
              cursor: "pointer",
            }}
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

        <main style={{ padding: "24px 0", width: "100%", minHeight: "400px" }}>
          <div
            style={{
              margin: "auto",
            }}
            className="d-flex flex-column align-items-center"
          >
            {carrinho.length === 0 ? <CarrinhoVazio /> : null}
            {carrinho
              .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
              .map((prod) => {
                return (
                  <div>
                    <CardCarrinhoComponent
                      titulo={prod.titulo}
                      preco={prod.preco}
                      src={prod.src}
                      qtd={
                        carrinho.filter((valor) => valor.id === prod.id).length
                      }
                      add={() => add(prod)}
                      remove={() => remove(prod)}
                    />
                  </div>
                );
              })}

            {mostrarDetalhes()}
          </div>
        </main>

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
    if (finalizar) {
      return (
        <FinalizarCompraComponent
          closeModal={closeModal}
          voltarCarrinho={() => setFinalizar(!finalizar)}
          carrinho={carrinho}
          frete={taxaEntrega === 5 ? true : false}
        ></FinalizarCompraComponent>
      );
    } else {
      return <CarrinhoComp></CarrinhoComp>;
    }
  };

  return <>{isFinalizar()}</>;
};

export default CarrinhoComponent;
