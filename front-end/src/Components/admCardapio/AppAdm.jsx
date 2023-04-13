import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import { ClientWSContext } from "../../context/ClientWSContext";
import "./AppAdm.css";
import CreateCategoriaComponent from "./components/CreateCategoriaComponent";
import CreateProdutoComponent from "./components/CreateProdutoComponent";
import GraficosComponent from "./components/GraficosComponent";
import ListCategoriaComponent from "./components/ListCategoriaComponent";
import ListPedidoComponent from "./components/ListPedidoComponent";
import ListPedidoFinalizadoComponent from "./components/ListPedidoFinalizadoComponent";
import ListProdutoComponent from "./components/ListProdutoComponent";
import UpdateProdutoComponet from "./components/UpdateProdutoComponent";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const PainelPrincipal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setClient, setConnected, connected, client } =
    useContext(ClientWSContext);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (client && connected) {
      let subscription = null;

      subscription = client?.subscribe(
        "/topic/pedidos",
        function (message) {
          console.log(message);
          toast.info("Novo pedido recebido");
        },
        { id: "main" }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [client, connected]);

  useEffect(() => {
    const client = new StompJs.Client({
      brokerURL: "ws://localhost:8080/admin",
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
      setConnected(true);
    };

    client.onStompError = function (frame) {
      // console.log("Broker reported error: " + frame.headers["message"]);
      // console.log("Additional details: " + frame.body);
    };

    client.activate();
    setClient(client);

    return () => {
      setConnected(false);
      client.deactivate();
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", padding: "0" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to={`/adm/dashboard`}>DashBoard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Pedidos">
            <Menu.Item key="3">
              <Link to={`/adm/pedidos/andamento`}>Em Andamento</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`/adm/pedidos/finalizados`}>Finalizados</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<UserOutlined />} title="Formulário">
            <Menu.Item key="5">
              <Link to={`/adm/form/produtos`}>Produtos</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to={`/adm/form/categorias`}>Categorias</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="singout" icon={<PieChartOutlined />}>
            <Link to={`/adm/singout`}>Sair</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route exact path={`/adm/dashboard`}>
                <GraficosComponent />
              </Route>
              <Route exact path={`/adm/pedidos/andamento`}>
                <ListPedidoComponent />
              </Route>
              <Route exact path={`/adm/pedidos/finalizados`}>
                <ListPedidoFinalizadoComponent />
              </Route>
              <Route exact path={`/adm/form/produtos`}>
                <ListProdutoComponent />
              </Route>
              <Route exact path={`/adm/form/categorias`}>
                <ListCategoriaComponent />
              </Route>

              <Route
                exact
                path={`/adm/form/add-produto`}
                component={CreateProdutoComponent}
              />
              <Route
                path={`/adm/form/edit-produto/:id`}
                component={UpdateProdutoComponet}
              />
              <Route
                path={`/adm/form/edit-categoria/:id`}
                component={CreateCategoriaComponent}
              />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by{" "}
          <a
            className="pe-auto text-decoration-underline"
            href="https://github.com/donathanqueiros/"
            target="_blank"
          >
            Donathan Queiros
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default PainelPrincipal;
