import React, { useState } from "react";
import HeaderComponent from "../Cardapio/HeaderComponent";
import FooterComponent from "../Cardapio/FooterComponent";
import CardapioComponent from "./CardapioComponent";
import Fundo from "../../assets/img/fundo.png";
import ModalComponent from "./ModalComponent";
import CarrinhoComponent from "./CarrinhoComponent";

const AppCardapio = () => {
  const [show, setShow] = useState(false);
  const [carrinho, setCarrinho] = useState({});
  // var value = carrinho.itens.filter((value) => value.id === id);
  // if (value.length != 0) {
  // setCarrinho({ itens: [...carrinho.itens, ] });
  // }
  // const counters = [...this.state.counters];
  // const index = counters.indexOf(counter);
  // counters[index] = { ...counters[index] };
  // counters[index].value++;
  // this.setState({ counters });
  const style = {
    backgroundImage: `url(${Fundo})`,
    backgroundRepeat: "repeat-y",
  };

  return (
    <div style={style}>
      <HeaderComponent teste={() => console.log(setShow(true))} />
      <CardapioComponent></CardapioComponent>
      <FooterComponent></FooterComponent>0
      <ModalComponent onHide={() => setShow(false)} show={show}>
        <CarrinhoComponent closeModal={() => setShow(false)} />
      </ModalComponent>
    </div>
  );
};

export default AppCardapio;
