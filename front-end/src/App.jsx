import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppCardapio from './Components/Cardapio/AppCardapio';
import AppAdmCardapio from './Components/AdmCardapio/AppAdmCardapio';
import 'antd/dist/antd.css';
import AppAdm from './Components/AdmCardapioNEW/AppAdm';
import CreateProdutoComponent from './Components/AdmCardapioNEW/Components/CreateProdutoComponent'

class App extends Component {



    render() {
        return (
            <Router>
                <div className="">
                    <Switch>

                        <Route path='/' exact component={AppCardapio}></Route>
                        <Route path='/admcardapio' exact component={AppAdmCardapio}></Route>
                        <Route path='/adm/add-produto/' component={CreateProdutoComponent}></Route>
                        {/* <Route path='/view-employee/:id' component={ViewEmployeeComponent}></Route> */}
                        <Route path='/adm' exact component={AppAdm}></Route>

                    </Switch>

                </div>


            </Router>
        );
    }
}

export default App;