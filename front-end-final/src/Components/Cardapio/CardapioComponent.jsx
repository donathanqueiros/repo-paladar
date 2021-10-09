import React, { useContext, useEffect, useState } from "react";
// import CategoriaComponent from "./CategoriaComponent";
// import ItemCategoriaComponent from "./ItemCategoriaComponent";
import LabelComponent from "./LabelComponent";
import CardPequenoComponent from "./CardPequenoComponent";
import CategoriaComponent from "./CategoriaComponent";
import ModalComponent from "./ModalComponent";
import CarrinhoComponent from "./CarrinhoComponent";
import { Button, Container, Row } from "react-bootstrap";
import { Badge, TabBar } from "antd-mobile";
import { ContentOutline, UnorderedListOutline } from "antd-mobile-icons";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import { MobileContext } from "../../context/MobileContext";
import ProdutoService from "../../services/ProdutoService";
import CategoriaProdutoService from "../../services/CategoriaProdutoService";

const CardapioComponent = ({
  produtos,
  categorias,
  showModal,
  closeModal,
  show,
}) => {
  const [activeKey, setActiveKey] = useState("cardapio");
  const [carrinho, addCarrinho, removeCarrinho] = useContext(CarrinhoContext);

  // const [mobile] = useContext(MobileContext);
  var mobile = false;

  const centroStyle = {
    margin: "auto",
    maxWidth: "1232px",
    height: "100%",
    paddingBottom: "120px",

    boxShadow:
      "10px 0px 30px rgba(0, 0, 0, 0.25), -10px 0px 30px rgba(0, 0, 0, 0.25)",
  };

  const tabs = [
    {
      key: "cardapio",
      title: "Cardapio",
      icon: <ContentOutline />,
      badge: Badge.dot,
    },
    {
      key: "carrinho",
      title: "Carrinho",
      icon: <UnorderedListOutline />,
      badge: "5",
    },
  ];

  function NavBar() {
    return (
      <Container>
        <TabBar
          activeKey={activeKey}
          onChange={(e) => {
            setActiveKey(e);
            e === "carrinho" ? setShow(true) : setShow(false);
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
      <Container style={centroStyle}>
        <Row>
          <LabelComponent
            mobile={mobile}
            texto="Destaques"
            linha
          ></LabelComponent>
        </Row>
        {/* <BannerComponent imagens={data.banner}></BannerComponent> */}

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
            return (
              <CategoriaComponent
                key={cat.nome}
                linha
                titulo={cat.nome}
                mobile={mobile}
              >
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
                          carrinho.filter((valor) => valor.id === prod.id)
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
      <Container Key="desktop-cardapio" style={centroStyle} fluid>
        {/* <Row>
          <LabelComponent titulo="Destaques" linha></LabelComponent>
        </Row> */}

        {/* <BannerComponent imagens={data.banner}></BannerComponent> */}

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
        <Row key="teste">
          {categorias.map((cat) => {
            return (
              <CategoriaComponent chave={cat.nome} linha titulo={cat.nome}>
                {produtos.map((prod) => {
                  if (prod.categoriaProduto.id === cat.id) {
                    return (
                      <CardPequenoComponent
                        chave={prod.nome}
                        mobile={mobile}
                        titulo={prod.nome}
                        subtitulo={prod.descricao}
                        preco={prod.preco}
                        src={prod.imgProduto.src}
                        qtd={
                          carrinho.filter((valor) => valor.id === prod.id)
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
        <CarrinhoComponent closeModal={closeModal} />
      </Container>
    );
  }

  return (
    <>
      <Container fluid>{false ? <Mobile /> : <Desktop />}</Container>
      <ModalComponent show={show} onHide={closeModal}></ModalComponent>
    </>
  );
};

export default CardapioComponent;
