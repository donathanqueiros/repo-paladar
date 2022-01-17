import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppCardapio from "./components/cardapio/AppCardapio";
import "antd/dist/antd.css";
import AppAdm from "./components/admCardapio/AppAdm.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { GlobalContextProvider } from "./context/index.jsx";

const App = () => {
  return (
    <Container fluid>
      <Router>
        <Switch>
          <GlobalContextProvider>
            <Row>
              <Route path="/" exact component={AppCardapio} />
            </Row>
            <Row>
              <Route path="/adm" component={AppAdm} />
            </Row>
          </GlobalContextProvider>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
