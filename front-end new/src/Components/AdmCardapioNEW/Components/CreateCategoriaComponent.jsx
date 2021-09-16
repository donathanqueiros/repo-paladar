import React, { useEffect, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ProdutoService from "../../../services/ProdutoService";
import CategoriaProdutoService from "../../../services/CategoriaProdutoService";

export default ({ match }) => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [categoriaProduto, setCategoriaProduto] = useState({
    id: "",
    nome: "",
  });
  const idParametro = match.params.id;

  useEffect(() => {
    if (idParametro) {
      CategoriaProdutoService.getCategoriaById(match.params.id).then((res) => {
        setCategoriaProduto(res.data);
      });
    }
  }, []);

  const saveProduto = () => {
    console.log(`json => ${JSON.stringify(categoriaProduto)}`);
    if (idParametro) {
      CategoriaProdutoService.updateCategoria(
        categoriaProduto,
        categoriaProduto.id
      )
        .then(() => {
          alert("atualizado com sucesso");
          history.push("/adm/form/categorias");
        })
        .catch((e) => alert("erro"));
    } else {
      CategoriaProdutoService.createCategoria(categoriaProduto)
        .then(() => {
          alert("criado com sucesso");
          history.push("/adm/form/categorias");
        })
        .catch((e) => alert("erro"));
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
      saveProduto();
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
    <>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md=3">
            <h3>{idParametro ? "Atualizar" : "Adicionar"} Categoria Produto</h3>
            <div className="card-body">
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
                  {idParametro ? "Atualizar" : "Adicionar"} Produto
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
