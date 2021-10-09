import React, { useEffect, useState } from "react";
import { Container, Modal, Button, Col, Row, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import useMessage from "../../../hooks/useMessage";
import ProdutoService from "../../../services/ProdutoService";

export default () => {
  const [produtos, setProdutos] = useState([]);
  const history = useHistory();
  const { LoadingModal, esconderLoading, mostrarLoading } = useLoading();
  const { sucess, error } = useMessage();

  const deleteProduto = (id) => {
    mostrarLoading();
    ProdutoService.deleteProduto(id)
      .then((res) => {
        console.log(res);
        sucess("Produto deletado com sucesso");

        setProdutos(produtos.filter((produto) => produto.id !== id));
      })
      .catch((err) => {
        error("erro ao excluir o produto");
      })
      .finally(esconderLoading);
  };

  useEffect(() => {
    mostrarLoading();
    ProdutoService.getProdutos()
      .then((res) => {
        setProdutos(res.data);
      })
      .finally(esconderLoading);
  }, []);

  const viewProduto = (id) => {
    console.log(id);
    history.push(`/view-produto/${id}`);
  };

  const editProduto = (id) => {
    history.push(`/adm/form/edit-produto/${id}`);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <h2 className="text-center">Produtos</h2>
      </Row>

      <Row>
        <Col
          md={{ span: 4, offset: 8 }}
          className={"d-flex justify-content-center"}
        >
          <Link to="/adm/form/add-produto">
            <Button variant="primary">Adicionar Produto</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Table striped bordered>
          <thead>
            <tr className="text-center">
              <th>Nome </th>
              <th>Descrição </th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className="text-center">
                <td className="align-middle">{produto.nome}</td>
                <td className="align-middle">{produto.descricao}</td>
                <td className="align-middle">{produto.preco}</td>
                <td className="align-middle">
                  {produto.categoriaProduto.nome}
                </td>
                <td className="align-middle">
                  <Button
                    onClick={() => editProduto(produto.id)}
                    variant="info"
                  >
                    Atualizar
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteProduto(produto.id)}
                    variant="danger"
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <LoadingModal />
    </Container>
  );
};
