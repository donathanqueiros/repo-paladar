import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppCardapio from "./Components/Cardapio/AppCardapio";
import AppAdmCardapio from "./Components/AdmCardapio/AppAdmCardapio";
import "antd/dist/antd.css";
import AppAdm from "./Components/AdmCardapioNEW/AppAdm";
import CreateProdutoComponent from "./Components/AdmCardapioNEW/Components/CreateProdutoComponent";
import Teste from "./Teste";
import UpdateProdutoComponet from "./Components/AdmCardapioNEW/Components/UpdateProdutoComponent";
import CreateCategoriaComponent from "./Components/AdmCardapioNEW/Components/CreateCategoriaComponent";

const App = () => {
  const styleGeral = {
    "@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')": true,
  };

  return (
    <Router>
      <div style={styleGeral} className="">
        <Switch>
          <Route path="/" exact component={AppCardapio}></Route>
          <Route path="/admcardapio" exact component={AppAdmCardapio}></Route>
          <Route path="/adm/add-produto" component={CreateProdutoComponent} />
          <Route
            path="/adm/edit-categoria/:id"
            component={CreateCategoriaComponent}
          />
          <Route
            path="/adm/edit-categoria/"
            component={CreateCategoriaComponent}
          />
          <Route
            path="/adm/edit-produto/:id"
            component={UpdateProdutoComponet}
          />
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
};

export default App;
