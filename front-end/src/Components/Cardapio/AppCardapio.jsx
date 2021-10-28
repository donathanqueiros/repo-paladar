import React, { useContext, useEffect, useState } from "react";

import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import CardapioComponent from "./CardapioComponent";
import { Container, Row } from "react-bootstrap";
import ProdutoService from "../../services/ProdutoService";
import CategoriaProdutoService from "../../services/CategoriaProdutoService";
import ModalComponent from "./ModalComponent";
import CarrinhoComponent from "./CarrinhoComponent";
import { MobileContext } from "../../context/MobileContext";

const AppCardapio = () => {
  const [isMobile] = useContext(MobileContext);
  const [show, setShow] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    ProdutoService.getProdutos().then((res) => {
      setProdutos(res.data.filter((prod) => prod.ativo === true));
    });
    CategoriaProdutoService.getCategorias().then((res) => {
      setCategorias(res.data);
    });
  }, []);

  const Principal = () => {
    return (
      <>
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
          <CarrinhoComponent
            mobile={isMobile}
            closeModal={() => setShow(false)}
          />
        </ModalComponent>
      </>
    );
  };

  return (
    <Container key="app-cardapio" fluid>
      <Row>
        <Principal />
      </Row>
    </Container>
  );
};

export default AppCardapio;
