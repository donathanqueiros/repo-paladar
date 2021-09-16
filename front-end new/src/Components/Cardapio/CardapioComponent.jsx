import React, { useEffect, useState } from "react";
// import CategoriaComponent from "./CategoriaComponent";
// import ItemCategoriaComponent from "./ItemCategoriaComponent";
import LabelComponent from "./LabelComponent";
import ProdutoService from "../../services/ProdutoService";
import CategoriaProdutoService from "../../services/CategoriaProdutoService";
import BannerComponent from "./BannerComponent";
import CardGrandeComponent from "./CardGrandeComponent";
import CardPequenoComponent from "./CardPequenoComponent";
import CategoriaComponent from "./CategoriaComponent";
import data from "../../data.js";
import ModalComponent from "./ModalComponent";
import CarrinhoComponent from "./CarrinhoComponent";
import useCarrinho from "../../hooks/useCarrinho";

const CardapioComponent = ({ show, setShow }) => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const { carrinho, addCarrinho, removeCarrinho } = useCarrinho();

  useEffect(() => {
    ProdutoService.getProdutos().then((res) => {
      setProdutos(res.data);
    });
    CategoriaProdutoService.getCategorias().then((res) => {
      setCategorias(res.data);
    });
  }, []);

  const centroStyle = {
    position: "relative",
    zIndex: "1",
    margin: "auto",
    maxWidth: "1232px",
    height: "100%",
    paddingBottom: "120px",

    boxShadow:
      "10px 0px 30px rgba(0, 0, 0, 0.25), -10px 0px 30px rgba(0, 0, 0, 0.25)",
  };

  function Teste() {
    return (
      <main style={{ width: "100%" }}>
        <div style={centroStyle}>
          <LabelComponent texto="Destaques" linha></LabelComponent>
          <BannerComponent imagens={data.banner}></BannerComponent>

          <CategoriaComponent titulo="MAIS VENDIDOS">
            {data.maisVendidos.map((mv) => {
              return (
                <CardGrandeComponent
                  titulo={mv.titulo}
                  subtitulo={mv.subtitulo}
                  preco={mv.preco}
                  src={mv.src}
                  qtd={carrinho.filter((valor) => valor.id === mv.id).length}
                  add={() => addCarrinho(mv)}
                  remove={() => {
                    removeCarrinho(mv);
                  }}
                />
              );
            })}
          </CategoriaComponent>

          {categorias.map((cat) => {
            console.log(cat);
            return (
              <CategoriaComponent titulo={cat.nome}>
                {produtos.map((prod) => {
                  console.log(prod.categoriaProduto.id === cat.id);
                  if (prod.categoriaProduto.id === cat.id) {
                    return (
                      <CardPequenoComponent
                        titulo={prod.nome}
                        subtitulo={prod.descricao}
                        preco={prod.preco}
                        src={prod.imgProduto.src}
                        qtd={
                          carrinho.filter((valor) => valor.id === prod.id)
                            .length
                        }
                        add={() => addCarrinho(prod)}
                        remove={() => removeCarrinho(prod)}
                      />
                    );
                  }
                })}
              </CategoriaComponent>
            );
          })}
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="container-cardapio">{<Teste />}</div>

      <ModalComponent onHide={() => {}} show={show}>
        <CarrinhoComponent
          carrinho={carrinho}
          closeModal={() => setShow(false)}
          add={addCarrinho}
          remove={removeCarrinho}
        />
      </ModalComponent>
    </>
  );
};

export default CardapioComponent;
