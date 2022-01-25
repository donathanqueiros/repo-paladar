import React, { useContext, useEffect, useState } from "react";
import CardPequenoComponent from "./CardPequenoComponent";
import CategoriaComponent from "./CategoriaComponent";
import ModalComponent from "./ModalComponent";
import CarrinhoComponent from "./CarrinhoComponent";
import { Col, Container, Row } from "react-bootstrap";
import { TabBar } from "antd-mobile";
import { ContentOutline, UnorderedListOutline } from "antd-mobile-icons";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import { MobileContext } from "../../context/MobileContext";
import styled from "styled-components";

const CardapioComponent = ({
  produtos,
  categorias,
  showModal,
  closeModal,
  show,
}) => {
  const [carrinho, addCarrinho, removeCarrinho] = useContext(CarrinhoContext);

  // function Mobile() {
  //   return (
  //     <StyledContainer
  //       style={{
  //         minHeight: "calc(100vh - 410px)",
  //         paddingBottom: "120px",
  //         boxShadow:
  //           "10px 0px 30px rgba(0, 0, 0, 0.25), -10px 0px 30px rgba(0, 0, 0, 0.25)",
  //       }}
  //       fluid
  //     >
  //       {/* <CategoriaComponent titulo="MAIS VENDIDOS">
  //         {maisVendidos.map((mv) => {
  //           return (
  //             <CardGrandeComponent
  //               titulo={mv.titulo}
  //               subtitulo={mv.subtitulo}
  //               preco={mv.preco}
  //               src={mv.src}
  //               qtd={carrinho.filter((valor) => valor.id === mv.id).length}
  //               add={() => addCarrinho(mv)}
  //               remove={() => {
  //                 removeCarrinho(mv);
  //               }}
  //             />
  //           );
  //         })}
  //       </CategoriaComponent> */}

  //       <Row>
  //         {categorias.map((cat) => {
  //           if (
  //             produtos.filter((prod) => prod.categoriaProduto.id === cat.id)
  //               .length > 0
  //           )
  //             return (
  //               <CategoriaComponent key={cat.nome} linha titulo={cat.nome}>
  //                 {produtos.map((prod) => {
  //                   if (prod.categoriaProduto.id === cat.id) {
  //                     return (
  //                       <CardPequenoComponent
  //                         key={prod.id}
  //                         titulo={prod.nome}
  //                         subtitulo={prod.descricao}
  //                         preco={prod.preco}
  //                         src={prod.imgProduto.src}
  //                         qtd={
  //                           carrinho?.filter((valor) => valor?.id === prod.id)
  //                             .length
  //                         }
  //                         add={() => addCarrinho(prod)}
  //                         remove={() => removeCarrinho(prod)}
  //                       />
  //                     );
  //                   }
  //                 })}
  //               </CategoriaComponent>
  //             );
  //         })}
  //       </Row>
  //     </StyledContainer>
  //   );
  // }

  return (
    <StyledContainer fluid>
      {/* <CategoriaComponent titulo="MAIS VENDIDOS">
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
          </CategoriaComponent> */}

      <Row>
        {categorias.map((cat) => {
          if (
            produtos.filter((prod) => prod.categoriaProduto.id === cat.id)
              .length > 0
          )
            return (
              <CategoriaComponent key={cat.nome} linha titulo={cat.nome}>
                {produtos.map((prod) => {
                  if (prod.categoriaProduto.id === cat.id) {
                    return (
                      <CardPequenoComponent
                        key={prod.id + "-" + prod.nome}
                        titulo={prod.nome}
                        subtitulo={prod.descricao}
                        preco={prod.preco}
                        src={prod.imgProduto.src}
                        qtd={
                          carrinho?.filter((valor) => valor?.id === prod.id)
                            .length
                        }
                        ContentOutline={showModal}
                        add={() => addCarrinho(prod)}
                        remove={() => removeCarrinho(prod)}
                      />
                    );
                  }
                })}
              </CategoriaComponent>
            );
        })}
      </Row>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding-bottom: 100px;
`;

export default CardapioComponent;
