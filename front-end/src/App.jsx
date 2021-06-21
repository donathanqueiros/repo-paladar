import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppCardapio from "./Components/Cardapio/AppCardapio";
import AppAdmCardapio from "./Components/AdmCardapio/AppAdmCardapio";
import "antd/dist/antd.css";
import AppAdm from "./Components/AdmCardapioNEW/AppAdm";
import CreateProdutoComponent from "./Components/AdmCardapioNEW/Components/CreateProdutoComponent";
import Teste from "./Teste";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Switch>
            <Route path="/" exact component={AppCardapio}></Route>
            <Route path="/admcardapio" exact component={AppAdmCardapio}></Route>
            <Route
              path="/adm/add-produto"
              component={CreateProdutoComponent}
            ></Route>
            {/* <Route path='/view-employee/:id' component={ViewEmployeeComponent}></Route> */}
            <Route path="/adm" component={AppAdm}></Route>
            <Route path="/teste" component={Teste}></Route>
            <Route
              path="/form/produto"
              exact
              component={CreateProdutoComponent}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
