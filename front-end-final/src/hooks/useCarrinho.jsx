import { useState } from "react";

export default function useCarrinho() {
  const [carrinho, setCarrinho] = useState([]);

  const add = (produto) => {
    setCarrinho((prevValue) => [...prevValue, produto]);
  };

  const removeCarrinho = (produto) => {
    var idx = carrinho.findIndex((p) => p.id == produto.id);
    if (idx != -1) {
      carrinho.splice(idx, 1);
      setCarrinho([...carrinho]);
    }
  };

  return {
    carrinho: carrinho,
    addCarrinho: add,
    removeCarrinho: removeCarrinho,
  };
}
