import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
import GraficosComponent from "./Components/GraficosComponent";
import ListCategoriaComponent from "./Components/ListCategoriaComponent";
import ListPedidoComponent from "./Components/ListPedidoComponent";
import ListPedidoFinalizadoComponent from "./Components/ListPedidoFinalizadoComponent";
import ListProdutoComponent from "./Components/ListProdutoComponent";
import CreateProdutoComponent from "./Components/CreateProdutoComponent";
import UpdateProdutoComponet from "./Components/UpdateProdutoComponent";
import CreateCategoriaComponent from "./Components/CreateCategoriaComponent";
import { Container, Row, Col } from "react-bootstrap";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SiderDemo = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { url, path, isExact, params } = useRouteMatch();
  const history = useHistory();

  const onCollapse = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    console.log(path);
    console.log(url);
    console.log(isExact);
    console.log(params);

    // if (path === "/adm") history.push("/adm/dashboard");
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
          {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link>Cardapio</Link>
              </Menu.Item> */}

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
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
          </Breadcrumb> */}

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
                path={`${url}/form/edit-categoria`}
                component={CreateCategoriaComponent}
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
          <a className="pe-auto text-decoration-underline">
            {" "}
            Donathan Queiros{" "}
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default SiderDemo;
