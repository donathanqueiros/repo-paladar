import React, { Component } from 'react';
import HeaderComponent from '../Cardapio/HeaderComponent';
import FooterComponent from '../Cardapio/FooterComponent';
import CardapioComponent from './CardapioComponent';


class AppCardapio extends Component {
    render() {
        return (
            <div>
                <HeaderComponent></HeaderComponent>
                <CardapioComponent></CardapioComponent>
                <FooterComponent></FooterComponent>
            </div>
        );
    }
}

export default AppCardapio;