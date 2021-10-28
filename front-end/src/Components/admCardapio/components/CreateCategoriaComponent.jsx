import React, { useEffect, useState } from "react";
import { Col, Form, Button, Card, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CategoriaProdutoService from "../../../services/CategoriaProdutoService";
import useLoading from "../../../hooks/useLoading";
import useMessage from "../../../hooks/useMessage";

export default ({ match }) => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { LoadingModal, esconderLoading, mostrarLoading } = useLoading();
  const { sucess, error } = useMessage();
  const [categoriaProduto, setCategoriaProduto] = useState({
    id: "",
    nome: "",
  });
  const idParametro = match.params.id;
  useEffect(() => {
    if (idParametro != "_add") {
      mostrarLoading();
      CategoriaProdutoService.getCategoriaById(match.params.id)
        .then((res) => {
          setCategoriaProduto(res.data);
        })
        .finally(esconderLoading);
    }
  }, []);

  const saveCategoria = () => {
    if (idParametro != "_add") {
      CategoriaProdutoService.updateCategoria(
        categoriaProduto,
        categoriaProduto.id
      )
        .then(() => {
          sucess("atualizado com sucesso");
          history.push("/adm/form/categorias");
        })
        .catch((e) => error("erro"));
    } else {
      CategoriaProdutoService.createCategoria(categoriaProduto)
        .then(() => {
          sucess("criado com sucesso");
          history.push("/adm/form/categorias");
        })
        .catch((e) => error("erro"));
    }
  };

  const handleProdutoChange = (e) => {
    let { name, value } = e.target;

    setCategoriaProduto((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      saveCategoria();
    }
  };

  const findFormErrors = () => {
    const { nome } = categoriaProduto;

    const newErrors = {};
    // name errors
    if (!nome || nome === "") newErrors.nome = "Não pode ser vazio!";
    else if (nome.length < 2) newErrors.nome = "Nome é muito curto";

    return newErrors;
  };

  return (
    <Container>
      <Row>
        <Card as={Col} className=" col-md-6 offset-md-3 offset-md=3">
          <h3>
            {idParametro != "_add" ? "Atualizar" : "Adicionar"} Categoria
            Produto
          </h3>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  value={categoriaProduto.nome}
                  onChange={handleProdutoChange}
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  isInvalid={!!errors.nome}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit">
                {idParametro != "_add" ? "Atualizar" : "Adicionar"} Produto
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <LoadingModal />
    </Container>
  );
};
