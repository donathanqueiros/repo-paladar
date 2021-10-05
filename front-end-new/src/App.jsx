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
import { Container, Row, Col } from "react-bootstrap";
import { GlobalContextProvider } from "./context/index.jsx";

const App = () => {
  const styleGeral = {
    width: "100%",
    padding: "0px 0px",
    margin: "0px 0px",
  };

  return (
    <Router>
      <Container style={styleGeral} fluid>
        <Switch>
          <Route path="/teste" component={Teste}></Route>
          <GlobalContextProvider>
            <Route path="/" exact component={AppCardapio}></Route>
          </GlobalContextProvider>

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

          <Route
            path="/form/produto"
            exact
            component={CreateProdutoComponent}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
