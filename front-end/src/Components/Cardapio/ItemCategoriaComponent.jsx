import React, { Component } from 'react';
import './ItemCategoriaComponent.css'

class ItemCategoriaComponent extends Component {
    render(props) {
        return (
            <>
                <div className="container-item">
                    <div className="info-item">
                        <h1 className="nome-item">{this.props.nome || "pizza, frango e catupiry"}</h1>
                        <p className="desc-item">{this.props.descricao || "descricao"}</p>
                        <h2 className="preco-item">{this.props.preco || "0.00"}</h2>

                    </div>

                    <div className="div-img-item">
                        {/* <img className="img-item" src={this.props.img || null} alt="" srcset=""/> */}
                    </div>

                </div>
            </>
        );
    }
}

export default ItemCategoriaComponent;