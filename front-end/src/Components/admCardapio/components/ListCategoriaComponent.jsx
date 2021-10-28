import { Container, Row, Button, Col, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import useMessage from "../../../hooks/useMessage";
import CategoriaProdutoService from "../../../services/CategoriaProdutoService";

export default () => {
  const [categorias, setCategorias] = useState([]);
  const { LoadingModal, esconderLoading, mostrarLoading } = useLoading();
  const { sucess, error } = useMessage();
  const history = useHistory();

  function deletarCategoria(id) {
    mostrarLoading();
    CategoriaProdutoService.deleteCategoria(id)
      .then(() => {
        setCategorias(categorias.filter((categoria) => categoria.id !== id));
        sucess("Deletado com sucesso");
      })
      .catch((er) => {
        switch (er.response.status) {
          case 409:
            error(
              "Impossivel Excluir Essa Categoria pois ela possui Produtos vinculados"
            );
            break;
        }
      })
      .finally(esconderLoading);
  }

  function editCategoria(id) {
    history.push(`/adm/form/edit-categoria/${id}`);
  }

  useEffect(() => {
    mostrarLoading();
    CategoriaProdutoService.getCategorias()
      .then((res) => {
        setCategorias(res.data);
      })
      .finally(esconderLoading);
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <h2 className="text-center">Lista Categorias</h2>
      </Row>

      <Row>
        <Col
          md={{ span: 4, offset: 8 }}
          className={"d-flex justify-content-center"}
        >
          <Button
            className="btn btn-primary"
            onClick={() => history.push("/adm/form/edit-categoria/_add")}
          >
            Adicionar Categoria
          </Button>
        </Col>
      </Row>

      <Row>
        <Table bordered striped>
          <thead>
            <tr className="text-center">
              <th>Nome produto </th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id} className="text-center">
                <td className="align-middle">{categoria.nome}</td>
                <td className="align-middle">
                  <Button
                    onClick={() => editCategoria(categoria.id)}
                    variant="info"
                  >
                    Atualizar
                  </Button>
                  <Button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deletarCategoria(categoria.id)}
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
