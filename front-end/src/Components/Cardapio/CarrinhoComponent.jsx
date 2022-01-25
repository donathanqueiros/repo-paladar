import React, { useContext, useEffect, useState } from "react";
import { colors, fontFamily } from "../../assets/css/Style";
import CardCarrinhoComponent from "./CardCarrinhoComponent";
import iconFechar from "../../assets/img/fechar.png";
import carrinhoImg from "../../assets/img/carrinho2.png";
import { Image, Container, Col, Row } from "react-bootstrap";
import FinalizarCompraComponent from "./FinalizarCompraComponent ";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import { Switch } from "antd";
import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";

const { black, red } = colors;
const { insani, mont } = fontFamily;
const CarrinhoComponent = ({ closeModal }) => {
  const [carrinho, addCarrinho, removeCarrinho] = useContext(CarrinhoContext);
  const [finalizar, setFinalizar] = useState(false);
  const [entrega, setEntrega] = useState(false);
  const [taxaEntrega, setTaxaEntrega] = useState(5);
  const [totalProduto, setTotalProduto] = useState(0);
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    setTotalProduto(
      carrinho.reduce(
        (acumulador, valorAtual) =>
          parseFloat(acumulador) + parseFloat(valorAtual?.preco || 0),
        0
      )
    );
  }, [carrinho]);

  useEffect(() => {
    entrega ? setTaxaEntrega(5) : setTaxaEntrega(0);
  }, [entrega]);

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

  const mostrarDetalhes = () => {
    if (carrinho.length > 0) {
      return (
        <Container
          fluid
          style={{
            maxWidth: "590px",
            marginTop: "30px",
          }}
        >
          <Row className="d-flex flex-column justify-content-start">
            <Col
              style={{ marginTop: "4px" }}
              className="d-flex justify-content-end"
            >
              <StyledTextArea
                placeholder="Observações"
                autoSize={{ minRows: 2 }}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
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

  return (
    <>
      {finalizar ? (
        <FinalizarCompraComponent
          observacao={observacao}
          closeModal={closeModal}
          voltarCarrinho={() => setFinalizar(!finalizar)}
          carrinho={carrinho}
          frete={taxaEntrega === 5}
        />
      ) : (
        <StyledContainer fluid>
          <Header>
            <Col xs={{ offset: 3, span: 6 }}>
              <span className="d-flex justify-content-center titulo">
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
          </Header>
          <Body>
            <Container fluid>
              {carrinho.length === 0 ? <CarrinhoVazio /> : null}
              {carrinho
                .filter((v, i, a) => a.findIndex((t) => t?.id === v?.id) === i)
                .map((prod, index) => {
                  return (
                    <Row key={index} style={{ marginBottom: "20px" }}>
                      <CardCarrinhoComponent
                        titulo={prod.nome}
                        preco={prod.preco}
                        src={prod.imgProduto.src}
                        qtd={
                          carrinho.filter((valor) => valor?.id === prod.id)
                            .length
                        }
                        add={() => addCarrinho(prod)}
                        remove={() => removeCarrinho(prod)}
                      />
                    </Row>
                  );
                })}

              <Row>{mostrarDetalhes()}</Row>
            </Container>
          </Body>
          <Footer />
        </StyledContainer>
      )}
    </>
  );
};

const Header = styled(Row)`
  height: 90px;
  background: #fddc00;
  position: relative;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 80px 80px 0px 0px;

  @media (max-width: 794px) {
    border-radius: 0px 0px 0px 0px;
    position: relative;
  }
`;

const Body = styled(Row)`
  padding: 24px 24px;
  min-height: 400px;
  background-color: white;
`;

const Footer = styled(Row)`
  position: relative;
  height: 90px;
  background: #fddc00;
  box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 80px 80px;

  @media (max-width: 794px) {
    border-radius: 0px 0px 0px 0px;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 794px;
  .titulo {
    height: 90px;
    ${insani};
    font-size: 36px;
    line-height: 41px;
    text-align: center;
    ${red};
  }

  @media (max-width: 794px) {
    max-width: 100%;
    width: 100%;
  }
`;

const StyledTextArea = styled(TextArea)`
  border: 1px solid black;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const CarrinhoVazio = () => {
  const { insani } = fontFamily;
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

export default CarrinhoComponent;
