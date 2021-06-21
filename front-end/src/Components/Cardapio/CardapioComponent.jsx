import React, { useEffect, useState } from "react";
import CategoriaComponent from "./CategoriaComponent";
import ItemCategoriaComponent from "./ItemCategoriaComponent";
import "./CardapioComponent.css";
import ProdutoService from "../../services/ProdutoService";
import CategoriaService from "../../services/CategoriaService";

const CardapioComponent = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    ProdutoService.getProdutos().then((res) => {
      console.log(res.data);
      setProdutos(res.data);
    });
    CategoriaService.getCategorias().then((res) => {
      console.log(res.data);
      setCategorias(res.data);
    });
  }, []);

  function Teste() {
    return (
      <>
        {categorias.map((categoria) => (
          <CategoriaComponent key={categoria.id} nome={categoria.nome}>
            {produtos.map((prod) => {
              if (categoria.id == prod.categoriaProduto.id) {
                return (
                  <ItemCategoriaComponent
                    key={prod.id}
                    nome={prod.nome}
                    descricao={prod.descricao}
                    preco={prod.preco}
                  />
                );
              }
            })}
          </CategoriaComponent>
        ))}
      </>
    );
  }

  return <div className="container-cardapio">{<Teste />}</div>;
};

export default CardapioComponent;
