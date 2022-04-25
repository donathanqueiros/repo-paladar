import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppCardapio from "./components/cardapio/AppCardapio";
import "antd/dist/antd.css";
import AppAdm from "./components/admCardapio/AppAdm.jsx";
import { GlobalContextProvider } from "./context/index.jsx";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Logoff from "./pages/Logoff";

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

          <Redirect exact from="/adm" to="/adm/dashboard" />
          <PrivateRoute path="/adm/">
            <AppAdm />
          </PrivateRoute>
        </Switch>
      </Router>
    </GlobalContextProvider>
  );
};

export default App;
