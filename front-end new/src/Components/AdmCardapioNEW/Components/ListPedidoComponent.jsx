import React, { useEffect, useState } from "react";
import { Form, FormCheck, Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PedidoService from "../../../services/PedidoService";
import ProdutoService from "../../../services/ProdutoService";

export default () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cliente, setCliente] = useState({});

  const [pedidos, setPedidos] = useState([]);
  const [checkBox, setCheckBox] = useState({
    PENDENTE: true,
    PREPARANDO: true,
    PRONTO: true,
    ENTREGA: true,
  });
  const history = useHistory();

  const deleteProduto = (id) => {
    ProdutoService.deleteProduto(id).then((res) => {
      console.log(res);

      setPedidos(pedidos.filter((produto) => produto.id !== id));
    });
  };

  useEffect(() => {
    PedidoService.getPedidosAndamento().then((res) => {
      setPedidos(res.data);
      console.log(res.data);
    });
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
      console.log(res.data);
    });
  };

  const checkBoxHandle = (e) => {
    const { id, checked } = e.target;

    setCheckBox({ ...checkBox, [id]: checked });
  };
  // const modalCliente = (cliente) => {
  //   handleShow();
  //   setCliente(cliente);
  // };


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
            <tr>
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
                <tr key={pedido.idPedido}>
                  <td>{pedido.idPedido}</td>
                  <td
                    className="cursor-pointer"
                  >
                    {pedido.cliente.nome}
                  </td>
                  <td>{pedido.entrega ? "Sim" : "Não"}</td>
                  <td>{pedido.produtos[0].nome}</td>
                  <td>{pedido.total}</td>
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
                      onClick={() => deleteProduto(pedido.idPedido)}
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

      
    
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cliente - {cliente.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ID: {cliente.id}
          Nome: {cliente.nome}
          Telefone: {cliente.telefone}
          Email: {cliente.email}
          Endereco: Logradouro: {cliente.endereco.logradouro} -{" "}
          {cliente.endereco.numero}
          Bairro: {cliente.endereco.bairro} - {cliente.endereco.cidade} -{" "}
          {cliente.endereco.estado}
          cep: {cliente.endereco.cep}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};
