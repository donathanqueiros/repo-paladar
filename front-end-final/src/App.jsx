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
  return (
    <Container fluid>
      <Router>
        <Switch>
          {/* <Route path="/teste" component={Teste}></Route> */}
          <GlobalContextProvider>
            <Row>
              <Route path="/" exact component={AppCardapio} />
            </Row>
            <Row>
              <Route path="/adm" component={AppAdm} />
            </Row>
          </GlobalContextProvider>

          {/* <Route path="/admcardapio" exact component={AppAdmCardapio}></Route> */}
          {/* <Route path="/adm/add-produto" component={CreateProdutoComponent} /> */}
          {/* <Route
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
          /> */}
          {/* <Route path='/view-employee/:id' component={ViewEmployeeComponent}></Route> */}
          {/* <Route
            path="/form/produto"
            exact
            component={CreateProdutoComponent}
          /> */}
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
