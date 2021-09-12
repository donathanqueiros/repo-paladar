import React, { useState } from "react";
// import CategoriaComponent from "./CategoriaComponent";
// import ItemCategoriaComponent from "./ItemCategoriaComponent";
import LabelComponent from "./LabelComponent";
// import ProdutoService from "../../services/ProdutoService";
// import CategoriaService from "../../services/CategoriaService";
import BannerComponent from "./BannerComponent";
import CardGrandeComponent from "./CardGrandeComponent";
import CardPequenoComponent from "./CardPequenoComponent";
import CategoriaComponent from "./CategoriaComponent";
import data from "../../data.js";
import ModalComponent from "./ModalComponent";
import CarrinhoComponent from "./CarrinhoComponent";

const CardapioComponent = ({ carrinho, setCarrinho, show, setShow }) => {
  const [produtos, setProdutos] = useState(data.produtos);
  const [categorias, setCategorias] = useState(data.categorias);

  // useEffect(() => {
  //   ProdutoService.getProdutos().then((res) => {
  //     console.log(res.data);
  //     // setProdutos(res.data);
  //   });
  //   CategoriaService.getCategorias().then((res) => {
  //     console.log(res.data);
  //     // setCategorias(res.data);
  //   });
  // }, []);

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

  const addCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const removeCarrinho = (produto) => {
    var idx = carrinho.findIndex((p) => p.id == produto.id);
    if (idx != -1) {
      carrinho.splice(idx, 1);
      setCarrinho([...carrinho]);
    }
  };

  function Teste() {
    // const handleShow = () => setShow(true);
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
            return (
              <CategoriaComponent titulo={cat.nome}>
                {produtos.map((prod) => {
                  if (prod.categoriaProduto === cat.nome) {
                    return (
                      <CardPequenoComponent
                        titulo={prod.titulo}
                        subtitulo={prod.subtitulo}
                        preco={prod.preco}
                        src={prod.src}
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

          {/* {categorias.map((categoria) => (
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
          ))} */}
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
          setCarrinho={setCarrinho}
          closeModal={() => setShow(false)}
          add={addCarrinho}
          remove={removeCarrinho}
        />
      </ModalComponent>
    </>
  );
};

export default CardapioComponent;
