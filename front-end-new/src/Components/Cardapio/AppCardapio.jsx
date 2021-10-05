import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import HeaderComponent from "../Cardapio/HeaderComponent";
import FooterComponent from "../Cardapio/FooterComponent";
import CardapioComponent from "./CardapioComponent";
import Fundo from "../../assets/img/fundo.png";
import { Container, Row } from "react-bootstrap";
import useCarrinho from "../../hooks/useCarrinho";
import ProdutoService from "../../services/ProdutoService";
import CategoriaProdutoService from "../../services/CategoriaProdutoService";

const AppCardapio = () => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    console.log("chamou did principal");
  }, []);
  useEffect(() => {
    ProdutoService.getProdutos().then((res) => {
      setProdutos(res.data);
    });

    CategoriaProdutoService.getCategorias().then((res) => {
      setCategorias(res.data);
    });
  }, []);

  const Principal = ({ mobile }) => {
    return (
      <>
        <HeaderComponent mobile={mobile} modalCarrinho={() => setShow(true)} />
        <CardapioComponent
          produtos={produtos}
          categorias={categorias}
          mobile={mobile}
        />
        <FooterComponent mobile={mobile} />
      </>
    );
  };

  function verifyIsMobile() {
    if (width < 768 && !isMobile) {
      setIsMobile(true);
    } else if (!(width < 768) && isMobile) {
      setIsMobile(false);
    }
  }

  return (
    <Container key="app-cardapio" style={{ minWidth: "400px" }} fluid>
      <Row>
        <Principal />
      </Row>
    </Container>
  );
};

export default AppCardapio;
