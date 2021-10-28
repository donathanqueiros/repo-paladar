import React, { useContext, useEffect, useState } from "react";
import CardPequenoComponent from "./CardPequenoComponent";
import CategoriaComponent from "./CategoriaComponent";
import ModalComponent from "./ModalComponent";
import CarrinhoComponent from "./CarrinhoComponent";
import { Container, Row } from "react-bootstrap";
import { TabBar } from "antd-mobile";
import { ContentOutline, UnorderedListOutline } from "antd-mobile-icons";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import { MobileContext } from "../../context/MobileContext";

const CardapioComponent = ({
  produtos,
  categorias,
  showModal,
  closeModal,
  show,
}) => {
  const [activeKey, setActiveKey] = useState("carrinho");
  const [carrinho, addCarrinho, removeCarrinho] = useContext(CarrinhoContext);
  const [isMobile] = useContext(MobileContext);

  const centroStyle = {
    margin: "auto",
    maxWidth: "1232px",
    minHeight: "calc(100vh - 410px)",
    paddingBottom: "120px",
    boxShadow:
      "10px 0px 30px rgba(0, 0, 0, 0.25), -10px 0px 30px rgba(0, 0, 0, 0.25)",
  };

  const tabs = [
    {
      key: "cardapio",
      title: "Cardapio",
      icon: <ContentOutline />,
    },
    {
      key: "carrinho",
      title: "Carrinho",
      icon: <UnorderedListOutline />,
      badge: carrinho.length,
    },
  ];

  useEffect(() => {
    show ? setActiveKey("carrinho") : setActiveKey("cardapio");
  }, [show]);

  function NavBar() {
    return (
      <Container>
        <TabBar
          activeKey={activeKey}
          onChange={(e) => {
            e === "carrinho" ? showModal() : closeModal();
          }}
        >
          {tabs.map((item) => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
            />
          ))}
        </TabBar>
      </Container>
    );
  }

  function Mobile() {
    return (
      <Container
        style={{
          minHeight: "calc(100vh - 410px)",
          paddingBottom: "120px",
          boxShadow:
            "10px 0px 30px rgba(0, 0, 0, 0.25), -10px 0px 30px rgba(0, 0, 0, 0.25)",
        }}
        fluid
      >
        {/* <CategoriaComponent titulo="MAIS VENDIDOS">
          {maisVendidos.map((mv) => {
            return (
              <CardGrandeComponent
                titulo={mv.titulo}
                subtitulo={mv.subtitulo}
                preco={mv.preco}
                src={mv.src}
                qtd={carrinho.filter((valor) => valor.id === mv.id).length}
                add={() => addCarrinho(mv)}
                remove={() => {
                  removeCarrinho(mv);
                }}
              />
            );
          })}
        </CategoriaComponent> */}

        <Row>
          {categorias.map((cat) => {
            if (
              produtos.filter((prod) => prod.categoriaProduto.id === cat.id)
                .length > 0
            )
              return (
                <CategoriaComponent key={cat.nome} linha titulo={cat.nome}>
                  {produtos.map((prod) => {
                    if (prod.categoriaProduto.id === cat.id) {
                      return (
                        <CardPequenoComponent
                          key={prod.id}
                          titulo={prod.nome}
                          subtitulo={prod.descricao}
                          preco={prod.preco}
                          src={prod.imgProduto.src}
                          qtd={
                            carrinho?.filter((valor) => valor?.id === prod.id)
                              .length
                          }
                          add={() => addCarrinho(prod)}
                          remove={() => removeCarrinho(prod)}
                        />
                      );
                    }
                  })}
                </CategoriaComponent>
              );
          })}
        </Row>

        <Row style={{ backgroundColor: "white" }} className="fixed-bottom">
          <NavBar />
        </Row>
      </Container>
    );
  }

  function Desktop() {
    return (
      <Container style={centroStyle} fluid>
        {/* <CategoriaComponent titulo="MAIS VENDIDOS">
            {data.maisVendidos.map((mv) => {
              return (
                <CardGrandeComponent
                  titulo={mv.titulo}
                  subtitulo={mv.subtitulo}
                  preco={mv.preco}
                  src={mv.src}
                  qtd={carrinho.filter((valor) => valor.id === mv.id).length}
                  add={() => addCarrinho(mv)}
                  remove={() => {
                    removeCarrinho(mv);
                  }}
                />
              );
            })}
          </CategoriaComponent> */}
        <Row>
          {categorias.map((cat) => {
            if (
              produtos.filter((prod) => prod.categoriaProduto.id === cat.id)
                .length > 0
            )
              return (
                <CategoriaComponent key={cat.nome} linha titulo={cat.nome}>
                  {produtos.map((prod) => {
                    if (prod.categoriaProduto.id === cat.id) {
                      return (
                        <CardPequenoComponent
                          key={prod.id + "-" + prod.nome}
                          titulo={prod.nome}
                          subtitulo={prod.descricao}
                          preco={prod.preco}
                          src={prod.imgProduto.src}
                          qtd={
                            carrinho?.filter((valor) => valor?.id === prod.id)
                              .length
                          }
                          add={() => addCarrinho(prod)}
                          remove={() => removeCarrinho(prod)}
                        />
                      );
                    }
                  })}
                </CategoriaComponent>
              );
          })}
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Container fluid>{isMobile ? Mobile() : Desktop()}</Container>
    </>
  );
};

export default CardapioComponent;
