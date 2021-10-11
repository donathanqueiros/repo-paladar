import React, { useContext, useEffect, useState } from "react";
import { colors, fontFamily } from "../../assets/css/Style";
import CardCarrinhoComponent from "./CardCarrinhoComponent";
import iconFechar from "../../assets/img/fechar.png";
import carrinhoImg from "../../assets/img/carrinho2.png";
import { Image, Container, Col, Row } from "react-bootstrap";
import FinalizarCompraComponent from "./FinalizarCompraComponent ";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import { Switch } from "antd";

const CarrinhoComponent = ({ mobile, closeModal }) => {
  const [carrinho, addCarrinho, removeCarrinho] = useContext(CarrinhoContext);
  const [finalizar, setFinalizar] = useState(false);
  const [entrega, setEntrega] = useState(false);

  const geralStyle = {
    maxWidth: "794px",

    backgroundColor: "#FFFFFFF",
  };
  const { insani, mont } = fontFamily;
  const { black, red } = colors;

  const [totalProduto, setTotalProduto] = useState(0);

  useEffect(() => {
    setTotalProduto(
      carrinho.reduce(
        (acumulador, valorAtual) =>
          parseFloat(acumulador) + parseFloat(valorAtual.preco),
        0
      )
    );
  }, [carrinho]);
  useEffect(() => {
    entrega ? setTaxaEntrega(5) : setTaxaEntrega(0);
  }, [entrega]);

  // useEffect(() => {
  //   if (entrega === "Sim") {
  //     setTaxaEntrega(5);
  //   } else {
  //     setTaxaEntrega(0);
  //   }
  // }, [entrega]);

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
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "29px",
  };
  const tituloStyle = {
    height: "90px",
    ...insani,
    fontSize: "36px",
    lineHeight: "41px",
    textAlign: "center",
    ...red,
  };

  const [taxaEntrega, setTaxaEntrega] = useState(5);
  const selectHandle = (e) => {};

  function Desktop() {
    return (
      <Container
        fluid
        style={geralStyle}
        className="d-flex flex-column align-items-center"
      >
        <Row
          style={{
            height: "90px",
            background: "#FDDC00",
            width: "100%",
            position: "relative",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
            borderRadius: "80px 80px 0px 0px",
          }}
        >
          <Col xs={{ offset: 3, span: 6 }}>
            <span style={tituloStyle} className="d-flex justify-content-center">
              meu <br />
              carrinho
            </span>
          </Col>

          <Col className="d-flex justify-content-center align-items-center">
            <Image
              style={{
                cursor: "pointer",
                width: "42px",
                height: "42px",
              }}
              onClick={closeModal}
              src={iconFechar}
            />
          </Col>
        </Row>

        <Row
          style={{
            padding: "24px 0",
            width: "100%",
            minHeight: "400px",
            backgroundColor: "white",
          }}
        >
          <Container fluid>
            {carrinho.length === 0 ? <CarrinhoVazio /> : null}
            {carrinho
              .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
              .map((prod, index) => {
                return (
                  <Row
                    key={index}
                    style={{ marginBottom: "20px", width: "100%" }}
                  >
                    <CardCarrinhoComponent
                      titulo={prod.nome}
                      preco={prod.preco}
                      src={prod.imgProduto.src}
                      qtd={
                        carrinho.filter((valor) => valor.id === prod.id).length
                      }
                      add={() => addCarrinho(prod)}
                      remove={() => removeCarrinho(prod)}
                    />
                  </Row>
                );
              })}

            <Row>{mostrarDetalhes()}</Row>
          </Container>
        </Row>

        <Row
          style={{
            position: "relative",
            width: "100%",
            height: "90px",
            background: "#FDDC00",
            boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.15)",
            borderRadius: "0px 0px 80px 80px",
          }}
        ></Row>
      </Container>
    );
  }

  function Mobile() {
    return (
      <Container
        fluid
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Row
          style={{
            height: "90px",
            background: "#FDDC00",
            position: "relative",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Col
            xs={{ span: 7, offset: 2 }}
            style={{
              ...insani,
              fontSize: "36px",
              lineHeight: "41px",
              textAlign: "center",
              ...red,
            }}
          >
            meu <br />
            carrinho
          </Col>
          <Col className="d-flex align-items-center" onClick={closeModal}>
            <Image
              style={{
                width: "42px",
                height: "42px",
              }}
              src={iconFechar}
            />
          </Col>

          {/* <div
            className="d-flex  align-items-center"
            style={{
              marginLeft: "auto",
              marginRight: "56px",
              cursor: "pointer",
            }}
            onClick={closeModal}
          >
          </div>
             */}
        </Row>

        <Row
          style={{
            padding: "24px 0",
            height: "600px",
            minHeight: "600px",

            minHeight: "400px",
          }}
        >
          <Container
            fluid
            style={{
              margin: "auto",
              width: "100%",
            }}
            className="d-flex flex-column align-items-center"
          >
            {carrinho.length === 0 ? <CarrinhoVazio /> : null}
            {carrinho
              .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
              .map((prod, index) => {
                return (
                  <Row
                    key={index}
                    style={{ marginBottom: "20px", width: "100%" }}
                  >
                    <CardCarrinhoComponent
                      titulo={prod.nome}
                      preco={prod.preco}
                      src={prod.imgProduto.src}
                      qtd={
                        carrinho.filter((valor) => valor.id === prod.id).length
                      }
                      add={() => addCarrinho(prod)}
                      remove={() => removeCarrinho(prod)}
                    />
                  </Row>
                );
              })}

            {mostrarDetalhes()}
          </Container>
        </Row>

        <Row>
          <Col
            style={{
              position: "relative",
              height: "90px",
              background: "#FDDC00",
              boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.15)",
              marginTop: "40px",
            }}
          />
        </Row>
      </Container>
    );
  }

  const mostrarDetalhes = () => {
    if (carrinho.length > 0) {
      return (
        <Container
          fluid
          style={{
            maxWidth: "590px",
            marginTop: "48px",
          }}
        >
          <Row>
            <Col className="d-flex justify-content-start">
              <span style={descricao}>Entrega?</span>
            </Col>
            <Col className="d-flex justify-content-end">
              <Switch
                style={{ msTransitionDelay: "100" }}
                checked={entrega}
                checkedChildren="Sim"
                unCheckedChildren="Não"
                onChange={setEntrega}
              />

              {/* <div
                style={{
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
                  {entrega.map((op) => (
                    <option value={op}>{op}</option>
                  ))}
                </select>
              </div> */}
            </Col>
          </Row>
          <Row style={{ marginTop: "4px" }}>
            <Col className="d-flex justify-content-between">
              <span style={descricao}>Valor total dos produtos</span>
              <span style={preco}>
                R$ {parseFloat(totalProduto).toFixed(2)}
              </span>
            </Col>
          </Row>
          <Row style={{ marginTop: "4px" }}>
            <Col className="d-flex justify-content-start">
              <span style={descricao}>Taxa de entrega</span>
            </Col>
            <Col className="d-flex justify-content-end">
              <span style={preco}>R$ {parseFloat(taxaEntrega).toFixed(2)}</span>
            </Col>
          </Row>
          <Row style={{ marginTop: "4px" }}>
            <Col className="d-flex justify-content-start">
              <span style={descricao}>Subtotal</span>
            </Col>
            <Col className="d-flex justify-content-end">
              <span style={preco}>
                R$ {parseFloat(totalProduto + taxaEntrega).toFixed(2)}
              </span>
            </Col>
          </Row>

          <Row
            className="d-flex justify-content-end"
            style={{ marginTop: "4px" }}
          >
            <div
              className="d-flex  justify-content-center align-items-center"
              style={{
                marginTop: "4px",
                width: "174px",
                height: "75px",
                background: "#FDDC00",
                boxShadow: "10px 10px 30px rgba(255, 203, 71, 0.3)",
                borderRadius: "10px",
                cursor: "pointer",
                marginRight: "10px",
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
          </Row>
        </Container>
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
    return <>{mobile ? Mobile() : Desktop()};</>;
  };

  const isFinalizar = () => {
    if (finalizar) {
      return (
        <FinalizarCompraComponent
          mobile={mobile}
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
