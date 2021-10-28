import { PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import "./AppAdm.css";
import GraficosComponent from "./components/GraficosComponent";
import ListCategoriaComponent from "./components/ListCategoriaComponent";
import ListPedidoComponent from "./components/ListPedidoComponent";
import ListPedidoFinalizadoComponent from "./components/ListPedidoFinalizadoComponent";
import ListProdutoComponent from "./components/ListProdutoComponent";
import CreateProdutoComponent from "./components/CreateProdutoComponent";
import UpdateProdutoComponet from "./components/UpdateProdutoComponent";
import CreateCategoriaComponent from "./components/CreateCategoriaComponent";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const PainelPrincipal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { url, path } = useRouteMatch();
  const history = useHistory();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (path === "/adm") history.push("/adm/dashboard");
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", padding: "0" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to={`${url}/dashboard`}>DashBoard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Pedidos">
            <Menu.Item key="3">
              <Link to={`${url}/pedidos/andamento`}>Em Andamento</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`${url}/pedidos/finalizados`}>Finalizados</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<UserOutlined />} title="Formulário">
            <Menu.Item key="5">
              <Link to={`${url}/form/produtos`}>Produtos</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to={`${url}/form/categorias`}>Categorias</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route exact path={`${url}/dashboard`}>
                <GraficosComponent />
              </Route>
              <Route exact path={`${url}/pedidos/andamento`}>
                <ListPedidoComponent />
              </Route>
              <Route exact path={`${url}/pedidos/finalizados`}>
                <ListPedidoFinalizadoComponent />
              </Route>
              <Route exact path={`${url}/form/produtos`}>
                <ListProdutoComponent />
              </Route>
              <Route exact path={`${url}/form/categorias`}>
                <ListCategoriaComponent />
              </Route>

              <Route
                exact
                path={`${url}/form/add-produto`}
                component={CreateProdutoComponent}
              />
              <Route
                path={`${url}/form/edit-produto/:id`}
                component={UpdateProdutoComponet}
              />
              <Route
                path={`${url}/form/edit-categoria/:id`}
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
