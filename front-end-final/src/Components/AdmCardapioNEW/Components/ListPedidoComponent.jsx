import React, { useEffect, useState } from "react";
import {
  FormCheck,
  Modal,
  Button,
  Col,
  Row,
  Container,
  Table,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import useMessage from "../../../hooks/useMessage";
import PedidoService from "../../../services/PedidoService";

export default () => {
  const [show, setShow] = useState(false);
  const { sucess, error } = useMessage();
  const { LoadingModal, esconderLoading, mostrarLoading } = useLoading();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: {
      cep: "",
      numero: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  });

  const [pedidos, setPedidos] = useState([]);
  const [checkBox, setCheckBox] = useState({
    PENDENTE: true,
    PREPARANDO: true,
    PRONTO: true,
    ENTREGA: true,
  });
  const history = useHistory();

  const cancelarPedido = (id) => {
    mostrarLoading();

    PedidoService.cancelarPedido(id)
      .then((res) => {
        sucess(`Pedido ${id} foi cancelado`);

        setPedidos(pedidos.filter((pedido) => pedido.idPedido !== id));
      })
      .catch(() => {
        error(`Erro ao cancelar`);
      })
      .finally(esconderLoading);
  };

  useEffect(() => {
    mostrarLoading();
    PedidoService.getPedidosAndamento()
      .then((res) => {
        setPedidos(res.data);
      })
      .finally(esconderLoading);

    setInterval(() => {
      attPedidos();
    }, 5000);
  }, []);

  const viewProduto = (id) => {
    console.log(id);
    history.push(`/view-produto/${id}`);
  };

  const despacharPedido = (id) => {
    mostrarLoading();
    PedidoService.despacharPedido(id)
      .then(() => {
        sucess(`Pedido ${id} foi para o proxima fase`);
        attPedidos();
      })
      .catch(() => {
        error(`Erro ao aprovar`);
      })
      .finally(esconderLoading);
  };

  const attPedidos = () => {
    PedidoService.getPedidosAndamento().then((res) => {
      setPedidos(res.data);
    });
  };

  const checkBoxHandle = (e) => {
    const { id, checked } = e.target;

    setCheckBox({ ...checkBox, [id]: checked });
  };
  const modalCliente = (cliente) => {
    setCliente(cliente);
    handleShow();
  };

  const renderProdutosPedido = (pedido) => {
    var { produtos } = pedido;

    return produtos
      .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
      .map((prod) => {
        return (
          <span>
            <b>{produtos.filter((valor) => valor.id === prod.id).length}</b>
            {" - "}
            <b>{prod.nome}</b> <br />
          </span>
        );
      });
  };

  function textButton(status) {
    var text;

    switch (status) {
      case "PENDENTE":
        text = "Preparar";
        break;
      case "PREPARANDO":
        text = "Pronto";
        break;

      case "PRONTO":
        text = "Entregar";
        break;

      case "ENTREGA":
        text = "Entregue";
        break;

      default:
        text = "Proximo";
        break;
    }

    return text;
  }

  return (
    <Container fluid>
      <Row className="flex justify-content-center">
        <h2>Pedidos</h2>
      </Row>
      <Row
        className="btn-group d-flex justify-content-between "
        dataToggle="buttons"
      >
        {Object.entries(checkBox).map((value) => {
          return (
            <Col
              style={{
                padding: "0px 5px",
              }}
            >
              <FormCheck
                className="btn btn-primary "
                style={{ width: "100%" }}
                label={value[0]}
                type={"checkbox"}
                id={value[0]}
                onClick={checkBoxHandle}
                checked={checkBox[value[0]]}
              />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>COD. Pedido </th>
              <th>Nome Cliente </th>
              <th>Entrega</th>
              <th>Produtos</th>
              <th>Total</th>
              <th>Status </th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {pedidos
              .filter((pedido) => checkBox[pedido.status])
              .map((pedido) => (
                <tr key={pedido.idPedido} className="text-center">
                  <td className="align-middle fw-bold fs-2">
                    <b>{pedido.idPedido}</b>
                  </td>
                  <td
                    className="cursor-pointer align-middle"
                    onClick={() => modalCliente(pedido.cliente)}
                  >
                    <a className="pe-auto"> {pedido.cliente.nome}</a>
                  </td>
                  <td className="align-middle">
                    {pedido.entrega ? "Sim" : "Não"}
                  </td>
                  <td className="align-middle">
                    {renderProdutosPedido(pedido)}
                  </td>
                  <td className="align-middle">
                    {parseFloat(pedido.total).toFixed(2).replace(".", ",")}
                  </td>
                  <td className="align-middle">{pedido.status}</td>
                  <td className="align-middle">
                    <button
                      onClick={() => despacharPedido(pedido.idPedido)}
                      className="btn btn-info"
                    >
                      {textButton(pedido.status)}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => cancelarPedido(pedido.idPedido)}
                      className="btn btn-danger"
                    >
                      Cancelar Pedido
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>

      <LoadingModal />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="text-center" closeButton>
          <Modal.Title>Cliente - {cliente.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ID: {cliente.id} <br />
          Nome: {cliente.nome}
          <br />
          Telefone: {cliente.telefone}
          <br />
          Email: {cliente.email}
          <br />
          Endereco: Logradouro: {cliente.endereco.logradouro} -{" "}
          {cliente.endereco.numero}
          <br />
          Bairro: {cliente.endereco.bairro} - {cliente.endereco.cidade} -{" "}
          {cliente.endereco.estado}
          <br />
          cep: {cliente.endereco.cep}
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};