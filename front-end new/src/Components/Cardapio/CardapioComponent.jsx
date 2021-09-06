import React from "react";
// import CategoriaComponent from "./CategoriaComponent";
// import ItemCategoriaComponent from "./ItemCategoriaComponent";
import LabelComponent from "./LabelComponent";
// import ProdutoService from "../../services/ProdutoService";
// import CategoriaService from "../../services/CategoriaService";
import BannerComponent from "./BannerComponent";
import CardGrandeComponent from "./CardGrandeComponent";
import CardPequenoComponent from "./CardPequenoComponent";
import CategoriaComponent from "./CategoriaComponent";

const CardapioComponent = () => {
  // const [produtos, setProdutos] = useState([]);
  // const [categorias, setCategorias] = useState([]);

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

  function Teste() {
    // const handleShow = () => setShow(true);
    return (
      <body style={{ width: "100%" }}>
        <div style={centroStyle}>
          <LabelComponent texto="Destaques" linha></LabelComponent>
          <BannerComponent></BannerComponent>

          <CategoriaComponent titulo="Mais Vendidos">
            <CardGrandeComponent
              titulo="Coxinha de frango com catupiry e bacon e mussarela e peperoni"
              subtitulo="Coxinha de frango com catupiry e bacon e mussarela e peperoni Coxinha de frango com catupiry e bacon e mussarela e peperoni Coxinha de frango com catupiry e bacon e mussarela e peperoni Coxinha de frango com catupiry e bacon e mussarela e peperoni Coxinha de frango com catupiry e bacon e mussarela e peperoni"
              preco="20"
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            ></CardGrandeComponent>

            <CardGrandeComponent
              titulo="Coxinha de frango com catupiry"
              subtitulo="asdasdasdasdasdasdsada"
              preco="20"
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            ></CardGrandeComponent>

            <CardGrandeComponent
              titulo="Coxinha de frango com catupiry"
              subtitulo="asdasdasdasdasdasdsada"
              preco="20"
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            ></CardGrandeComponent>
          </CategoriaComponent>

          <CategoriaComponent>
            <CardPequenoComponent
              titulo="Coxinha de frango com catupiry e bacom com cheader"
              subtitulo="uma coisa de louco que nunca se ve por ai uma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por ai"
              preco="20"
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            ></CardPequenoComponent>
            <CardPequenoComponent
              titulo="Coxinha de frango com catupiry e bacom com cheader"
              subtitulo="uma coisa de louco que nunca se ve por ai uma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por ai"
              preco="20"
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            ></CardPequenoComponent>
            <CardPequenoComponent
              titulo="Coxinha de frango com catupiry e bacom com cheader"
              subtitulo="uma coisa de louco que nunca se ve por ai uma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por ai"
              preco="20"
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            ></CardPequenoComponent>
            <CardPequenoComponent
              titulo="Coxinha de frango com catupiry e bacom com cheader"
              subtitulo="uma coisa de louco que nunca se ve por ai uma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por aiuma coisa de louco que nunca se ve por ai"
              preco="20"
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            ></CardPequenoComponent>
          </CategoriaComponent>

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
      </body>
    );
  }

  return <div className="container-cardapio">{<Teste />}</div>;
};

export default CardapioComponent;
