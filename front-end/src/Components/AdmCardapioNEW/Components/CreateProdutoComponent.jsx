import React, { useEffect, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ProdutoService from "../../../services/ProdutoService";
import CategoriaService from "../../../services/CategoriaService";

function Teste() {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [validated, setValidated] = useState(true);
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    categoriaProduto: {},
  });
  const [categoriaProdutos, setCategoriaProdutos] = useState([]);

  useEffect(() => {
    CategoriaService.getCategorias().then((res) => {
      setCategoriaProdutos(res.data);
      setProduto((prevState) => ({
        ...prevState,
        categoriaProduto: res.data[0],
      }));
    });
  }, []);

  const saveProduto = () => {
    console.log(`produto => ${JSON.stringify(produto)}`);

    ProdutoService.createProduto(produto).then((res) => {
      console.log(res);
      history.push("/adm");
    });
  };

  const handleProdutoChange = (e) => {
    let { name, value } = e.target;
    if (name === "categoriaProduto") {
      value = JSON.parse(value);
    }
    setProduto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    form.checkValidity();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      saveProduto();

      console.log(`produto => ${JSON.stringify(produto)}`);
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md=3">
            <h3>Adicionar Produto</h3>
            <div className="card-body">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Col}>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    required
                    value={produto.nome}
                    onChange={handleProdutoChange}
                    name="nome"
                    type="text"
                    placeholder="Nome"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    name="descricao"
                    value={produto.descricao}
                    onChange={handleProdutoChange}
                    type="text"
                    placeholder="Descrição"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Preço</Form.Label>
                  <Form.Control
                    name="preco"
                    value={produto.preco}
                    onChange={handleProdutoChange}
                    type="text"
                    placeholder="Preço"
                    required
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Categoria Produto</Form.Label>
                  <Form.Control
                    as="select"
                    name="categoriaProduto"
                    onChange={handleProdutoChange}
                  >
                    {categoriaProdutos.map((tp) => (
                      <option key={tp.id} value={JSON.stringify(tp)}>
                        {tp.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button type="submit">Adicionar Produto</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teste;
