import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppAdm from "./components/admCardapio/AppAdm.jsx";
import AppCardapio from "./components/cardapio/AppCardapio.jsx";
import { GlobalContextProvider } from "./context/index.jsx";
import Login from "./pages/Login";
import Logoff from "./pages/Logoff";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <GlobalContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={AppCardapio} />
          <Route path="/login" exact component={Login} />

          <Route exact path="/adm/singout">
            <Logoff />
          </Route>

          <Route path="/teste" exact component={Teste} />

          <Redirect exact from="/adm" to="/adm/dashboard" />
          <PrivateRoute path="/adm/">
            <AppAdm />
          </PrivateRoute>
        </Switch>
      </Router>
      <ToastContainer />
    </GlobalContextProvider>
  );
};

const Teste = () => {
  // stompClient.send("/app/chat", {},
  // JSON.stringify({'from':from, 'text':text}));

  const [time, setTime] = useState({ start: null, end: null });

  return (
    <div>
      <button
        onClick={() => {
          client.publish({
            destination: "/app/chat",
            body: JSON.stringify({
              nome: "teste",
              telefone: "(11) 11111-1111",
              email: "donathanbt@gmail.com",
              endereco: {
                cep: "17129068",
                numero: "11",
                logradouro: "Avenida Professor Luiz Odassi Neto",
                bairro: "Jardim Europa",
                cidade: "Agudos",
                estado: "SP",
              },
              carrinho: [1, 2, 3, 4],
              frete: true,
              formaPagamento: {
                id: 2,
              },
            }),
            skipContentLengthHeader: true,
          });
          setTime((time) => ({ ...time, start: new Date().getTime() }));
        }}
      >
        manda msg
      </button>
      diferença do tempo em milisegundo
      {time.start && time.end && time.end - time.start}
      <br />
      <pre>{JSON.stringify(time, null, 2)}</pre>
    </div>
  );
};

export default App;
