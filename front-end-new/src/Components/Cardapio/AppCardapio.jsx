import React, { useState } from "react";
import HeaderComponent from "../Cardapio/HeaderComponent";
import FooterComponent from "../Cardapio/FooterComponent";
import CardapioComponent from "./CardapioComponent";
import Fundo from "../../assets/img/fundo.png";
import useCarrinho from "../../hooks/useCarrinho";

const AppCardapio = () => {
  const [show, setShow] = useState(false);

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
      <HeaderComponent modalCarrinho={() => setShow(true)} />
      <CardapioComponent show={show} setShow={setShow} />
      <FooterComponent />
    </div>
  );
};

export default AppCardapio;
