import React, { createContext, useState } from "react";

export const CarrinhoContext = createContext();

const { Provider } = CarrinhoContext;

export const CarrinhoContextProvider = (props) => {
  const [carrinho, setCarrinho] = useState([]);

  const addCarrinho = (produto) => {
    setCarrinho((prevValue) => [...prevValue, produto]);
  };

  const removeCarrinho = (produto) => {
    var idx = carrinho.findIndex((p) => p.id == produto.id);
    if (idx != -1) {
      carrinho.splice(idx, 1);
      setCarrinho([...carrinho]);
    }
  };

  return (
    <Provider value={[carrinho, addCarrinho, removeCarrinho]}>
      {props.children}
    </Provider>
  );
};
