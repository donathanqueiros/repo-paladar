import React from "react";

const handleIncrement = (item) => {
  carrinho.itens.push(item);
};

const handleDecrement = (item) => {
  const index = carrinho.itens.indexOf({ id: item.id, preco: item.preco });

  if (index > -1) {
    carrinho.itens.splice(index, 1);
  }
};

const carrinho = {
  itens: [],
  addItem: handleIncrement,
  removeItem: handleDecrement,
};

const CarrinhoContext = React.createContext(carrinho);

export default CarrinhoContext;
