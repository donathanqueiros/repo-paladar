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
    ENTREGUE: true,
    CANCELADO: true,
  });
  const history = useHistory();

  useEffect(() => {
    PedidoService.getPedidosFinalizado().then((res) => {
      setPedidos(res.data);
      console.log(res.data);
    });
  }, []);

  const despacharPedido = (id) => {
    PedidoService.despacharPedido(id).then(() => {
      alert("Pedido Despachado");
      attPedidos();
    });
  };

  const attPedidos = () => {
    PedidoService.getPedidosAndamento().then((res) => {
      setPedidos(res.data);
      console.log(res.data);
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
            <b>{prod.nome}</b>
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
              label="ENTREGUE"
              type={type}
              id="ENTREGUE"
              onClick={checkBoxHandle}
              checked={checkBox.ENTREGUE}
            />
            <FormCheck
              inline
              label="CANCELADO"
              type={type}
              id="CANCELADO"
              onClick={checkBoxHandle}
              checked={checkBox.CANCELADO}
            />
          </div>
        ))}
      </Form>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID PEDIDO </th>
              <th>Nome Cliente </th>
              <th>Entrega</th>
              <th>Produtos</th>
              <th>Total</th>
              <th>Data Inicio </th>
              <th>Data Fim </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {pedidos
              .filter((pedido) => checkBox[pedido.status])
              .map((pedido) => (
                <tr key={pedido.idPedido}>
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
                  <td>{pedido.dataInicioPedido}</td>
                  <td>{pedido.dataFimPedido}</td>
                  <td>
                    <button onClick={() => null} className="btn btn-info">
                      VER
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
