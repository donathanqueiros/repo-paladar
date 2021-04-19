import React, { Component } from 'react';
import BannerComponent from './BannerComponent';
import CategoriaComponent from './CategoriaComponent';
import ItemCategoriaComponent from './ItemCategoriaComponent';
import './CardapioComponent.css'
import ProdutoService from '../../services/ProdutoService';
import TipoProdutoService from '../../services/TipoProdutoService';



class CardapioComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            produtos: [],
            tipoProdutos: []
        }

        this.Teste = this.Teste.bind(this);

    }


    Teste = (props) => {
        var tipoProdutos = this.state.tipoProdutos;
        var produtos = this.state.produtos;
        return (
            <>
                {
                    tipoProdutos.map((tipoProduto) =>
                        <CategoriaComponent key={tipoProduto.id} nome={tipoProduto.nome}>
                            {
                                produtos.map((prod) => {
                                    if (tipoProduto.id == prod.tipoProduto.id) {
                                        return <ItemCategoriaComponent nome={prod.nome} descricao={prod.descricao} preco={prod.preco} />
                                    }
                                })

                            }

                        </CategoriaComponent>
                    )

                }


            </>
        )
    }



    componentDidMount() {

        ProdutoService.getProdutos().then((res) => {
            console.log(res.data);
            this.setState({ produtos: res.data });
        });
        TipoProdutoService.getTipoProdutos().then((res) => {
            console.log(res.data);
            this.setState({ tipoProdutos: res.data });
        });


    }

    render() {
        return (
            <div className="container-cardapio">
                {this.Teste()}
            </div>
        );
    }
}

export default CardapioComponent;