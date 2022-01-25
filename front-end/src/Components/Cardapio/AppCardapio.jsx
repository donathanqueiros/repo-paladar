import React, { useContext, useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import CardapioComponent from "./CardapioComponent";
import { Col, Container, Row } from "react-bootstrap";
import ProdutoService from "../../services/ProdutoService";
import CategoriaProdutoService from "../../services/CategoriaProdutoService";
import ModalComponent from "./ModalComponent";
import CarrinhoComponent from "./CarrinhoComponent";
import { MobileContext } from "../../context/MobileContext";
import { TabBar } from "antd-mobile";
import { ContentOutline, UnorderedListOutline } from "antd-mobile-icons";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import styled from "styled-components";

const AppCardapio = () => {
  const [isMobile] = useContext(MobileContext);
  const [show, setShow] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carrinho] = useContext(CarrinhoContext);
  const [activeKey, setActiveKey] = useState("carrinho");

  useEffect(() => {
    ProdutoService.getProdutos().then((res) => {
      setProdutos(res.data.filter((prod) => prod.ativo === true));
    });
    CategoriaProdutoService.getCategorias().then((res) => {
      setCategorias(res.data);
    });
  }, []);

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

  const NavBar = ({ show }) => {
    if (!show) {
      return null;
    }
    return (
      <Container>
        <Row style={{ backgroundColor: "white" }} className="fixed-bottom">
          <TabBar
            activeKey={activeKey}
            onChange={(e) =>
              e === "carrinho" ? setShow(true) : setShow(false)
            }
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
        </Row>
      </Container>
    );
  };

  return (
    <SyledContainer key="app-cardapio" fluid>
      <Row>
        <HeaderComponent showModal={() => setShow(true)} />
        <CardapioComponent
          showModal={() => setShow(true)}
          closeModal={() => setShow(false)}
          show={show}
          produtos={produtos}
          categorias={categorias}
        />

        <FooterComponent />
        <ModalComponent show={show} onHide={() => setShow(false)}>
          <CarrinhoComponent closeModal={() => setShow(false)} />
        </ModalComponent>

        <NavBar show={isMobile} />
      </Row>
    </SyledContainer>
  );
};

const SyledContainer = styled(Container)`
  ${{
    margin: "auto",
    maxWidth: "1232px",
    boxShadow:
      "10px 0px 30px rgba(0, 0, 0, 0.25), -10px 0px 30px rgba(0, 0, 0, 0.25)",
  }}
`;

export default AppCardapio;
