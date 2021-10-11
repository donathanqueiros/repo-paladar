import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import HeaderComponent from "../Cardapio/HeaderComponent";
import FooterComponent from "../Cardapio/FooterComponent";
import CardapioComponent from "./CardapioComponent";
import { Col, Container, Row } from "react-bootstrap";
import { produtosData, categoriasProdutoData } from "../../data.js";
import useCarrinho from "../../hooks/useCarrinho";
import ProdutoService from "../../services/ProdutoService";
import CategoriaProdutoService from "../../services/CategoriaProdutoService";

const AppCardapio = () => {
  const [show, setShow] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  // const { height, width } = useWindowDimensions();
  // const { carrinho, addCarrinho, removeCarrinho } = useCarrinho();

  // var width = 1000;

  // var value = carrinho.itens.filter((value) => value.id === id);
  // if (value.length != 0) {
  // setCarrinho({ itens: [...carrinho.itens, ] });
  // }
  // const counters = [...this.state.counters];
  // const index = counters.indexOf(counter);
  // counters[index] = { ...counters[index] };
  // counters[index].value++;
  // this.setState({ counters });

  useEffect(() => {
    setProdutos(produtosData);
    setCategorias(categoriasProdutoData);
  }, []);

  const Principal = ({ mobile }) => {
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
      </>
    );
  };

  return (
    <Container key="app-cardapio" style={{ minWidth: "400px" }} fluid>
      <Row>
        <Principal />
      </Row>
    </Container>
  );
};

export default AppCardapio;
