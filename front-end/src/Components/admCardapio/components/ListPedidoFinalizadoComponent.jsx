import React, { useEffect, useState } from "react";
import {
  FormCheck,
  Modal,
  Button,
  Container,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import PedidoService from "../../../services/PedidoService";
import useLoading from "../../../hooks/useLoading";
import moment from "moment";

export default () => {
  const [show, setShow] = useState(false);
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
    ENTREGUE: true,
    CANCELADO: true,
  });

  useEffect(() => {
    mostrarLoading();
    PedidoService.getPedidosFinalizado()
      .then((res) => {
        setPedidos(res.data);
      })
      .finally(esconderLoading);
  }, []);

  const attPedidos = () => {
    PedidoService.getPedidosFinalizado().then((res) => {
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

    return produtos.map((prod) => {
      return (
        <span>
          <b>{prod.quantidade}</b>
          {" - "}
          <b>{prod.nome}</b>
          {" - "}
          <b>
            {parseFloat(prod.quantidade * prod.preco)
              .toFixed(2)
              .replace(".", ",")}
          </b>
          <br />
        </span>
      );
    });
  };

  return (
    <Container>
      <Row>
        <h2 className="text-center">Lista Produtos</h2>
      </Row>
      <Row>
        {Object.entries(checkBox).map((value) => {
          return (
            <Col className="d-flex justify-content-center">
              <FormCheck
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
        <Table striped bordered>
          <thead>
            <tr className="text-center">
              <th>ID PEDIDO </th>
              <th>Nome Cliente </th>
              <th>Entrega</th>
              <th>Produtos</th>
              <th>Total</th>
              <th>Data Inicio </th>
              <th>Data Fim </th>
              <th>Status </th>

              <th>Ações</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {pedidos
              .filter((pedido) => checkBox[pedido.status])
              .map((pedido) => (
                <tr key={pedido.idPedido}>
                  <td className="align-middle">{pedido.idPedido}</td>
                  <td
                    className="cursor-pointer align-middle pe-auto"
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
                  <td className="align-middle">
                    {moment(
                      pedido.dataInicioPedido,
                      "YYYY-MM-DDTHH:mm:ss"
                    ).format("DD/MM/YYYY HH:mm:ss")}
                  </td>
                  <td className="align-middle">
                    {moment(pedido.dataFimPedido, "YYYY-MM-DDTHH:mm:ss").format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </td>

                  <td className="align-middle">
                    {pedido.status === "CANCELADO" ? "CANCELADO" : "FINALIZADO"}
                  </td>

                  <td className="align-middle">
                    <button onClick={() => null} className="btn btn-info">
                      Informações
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <LoadingModal />
    </Container>
  );
};
