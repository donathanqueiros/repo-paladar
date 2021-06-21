import React, { useState } from "react";
import HeaderComponent from "../Cardapio/HeaderComponent";
import FooterComponent from "../Cardapio/FooterComponent";
import CardapioComponent from "./CardapioComponent";
import Sider from "antd/lib/layout/Sider";
import Layout from "antd/lib/layout/layout";
import { Button } from "antd";

const AppCardapio = () => {
  const [valor, setValor] = useState(400);

  // var value = carrinho.itens.filter((value) => value.id === id);
  // if (value.length != 0) {
  // setCarrinho({ itens: [...carrinho.itens, ] });
  // }
  // const counters = [...this.state.counters];
  // const index = counters.indexOf(counter);
  // counters[index] = { ...counters[index] };
  // counters[index].value++;
  // this.setState({ counters });

  return (
    <>
      <Layout>
        <Layout>
          <HeaderComponent>
            <Button
              onClick={() => {
                valor === 0 ? setValor(400) : setValor(0);
                console.log(valor);
              }}
            >
              teste
            </Button>
          </HeaderComponent>
          <CardapioComponent></CardapioComponent>
          <FooterComponent></FooterComponent>
        </Layout>
        <Sider collapsed={true} collapsedWidth={valor} theme="light">
          carrinho
        </Sider>
      </Layout>
    </>
  );
};

export default AppCardapio;
