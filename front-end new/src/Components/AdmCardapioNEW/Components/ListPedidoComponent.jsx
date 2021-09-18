import React, { useEffect, useState } from "react";
import { Form, FormCheck, Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PedidoService from "../../../services/PedidoService";
import ProdutoService from "../../../services/ProdutoService";

export default () => {
  const [show, setShow] = useState(false);

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
    PedidoService.cancelarPedido(id).then((res) => {
      console.log("pedido Cancelado");

      setPedidos(pedidos.filter((pedido) => pedido.idPedido !== id));
    });
  };

  useEffect(() => {
    PedidoService.getPedidosAndamento().then((res) => {
      setPedidos(res.data);
    });

    setInterval(() => {
      attPedidos();
    }, 5000);
  }, []);

  const viewProduto = (id) => {
    console.log(id);
    history.push(`/view-produto/${id}`);
  };

  const despacharPedido = (id) => {
    PedidoService.despacharPedido(id).then(() => {
      alert("Pedido Despachado");
      attPedidos();
    });
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

  return (
    <div>
      <h2 className="text-center">Lista Produtos</h2>
      {/* <div className="row">
        <Link to="/adm/add-produto">
          <button className="btn btn-primary">Add Produto</button>
        </Link>
      </div> */}
      <Form>
        {["checkbox"].map((type) => (
          <div key={`inline-${type}`} className="md-3">
            <FormCheck
              inline
              label="PENDENTE"
              type={type}
              id="PENDENTE"
              onClick={checkBoxHandle}
              checked={checkBox.PENDENTE}
            />
            <FormCheck
              inline
              label="PREPARANDO"
              type={type}
              id="PREPARANDO"
              onClick={checkBoxHandle}
              checked={checkBox.PREPARANDO}
            />
            <FormCheck
              inline
              label="PRONTO"
              type={type}
              id="PRONTO"
              onClick={checkBoxHandle}
              checked={checkBox.PRONTO}
            />
            <FormCheck
              inline
              label="ENTREGA"
              type={type}
              id="ENTREGA"
              onClick={checkBoxHandle}
              checked={checkBox.ENTREGA}
            />
          </div>
        ))}
      </Form>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>ID PEDIDO </th>
              <th>Nome Cliente </th>
              <th>Entrega</th>
              <th>Produtos</th>
              <th>Total</th>
              <th>Status </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {pedidos
              .filter((pedido) => checkBox[pedido.status])
              .map((pedido) => (
                <tr key={pedido.idPedido} className="text-center">
                  <td>{pedido.idPedido}</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => modalCliente(pedido.cliente)}
                  >
                    {pedido.cliente.nome}
                  </td>
                  <td>{pedido.entrega ? "Sim" : "Não"}</td>
                  <td>{renderProdutosPedido(pedido)}</td>
                  <td>
                    {parseFloat(pedido.total).toFixed(2).replace(".", ",")}
                  </td>
                  <td>{pedido.status}</td>
                  <td>
                    <button
                      onClick={() => despacharPedido(pedido.idPedido)}
                      className="btn btn-info"
                    >
                      Despachar
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
        </table>
      </div>

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
    </div>
  );
};