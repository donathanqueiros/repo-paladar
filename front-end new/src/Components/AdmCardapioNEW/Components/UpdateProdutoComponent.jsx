import React, { useEffect, useState } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ProdutoService from "../../../services/ProdutoService";
import CategoriaProdutoService from "../../../services/CategoriaProdutoService";

function UpdateProdutoComponet({ match }) {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: parseFloat(0),
    categoriaProduto: {},
  });
  const [categoriaProdutos, setCategoriaProdutos] = useState([]);

  useEffect(() => {
    CategoriaProdutoService.getCategorias().then((res) => {
      setCategoriaProdutos(res.data);
      setProduto((prevState) => ({
        ...prevState,
        categoriaProduto: res.data[0],
      }));
    });

    ProdutoService.getProdutoById(match.params.id).then((produto) => {
      setProduto(produto.data);

      setTimeout(() => {
        document.getElementById("categorias").value = JSON.stringify(
          produto.data.categoriaProduto
        );
      }, 200);
    });

    //     var select = document.getElementById('categorias');
    // var value = select.options[select.selectedIndex].text;
    // alert(value)
  }, []);

  const attProduto = (produto) => {
    console.log(`produto => ${JSON.stringify(produto)}`);

    ProdutoService.updateProduto(produto, produto.id)
      .then(() => {
        alert("produto criado com sucesso");
        history.push("/adm/form/produtos");
      })
      .catch((e) => alert("erro"));
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
      attProduto(produto);
    }
  };

  function validatePreco(valor) {
    var regex = /^\d+(?:\.\d{0,2})$/;
    if (regex.test(valor) && !isNaN(valor) && valor > 0) return true;
    return false;
  }

  const findFormErrors = () => {
    const { nome, preco } = produto;

    const newErrors = {};
    // name errors
    if (!nome || nome === "") newErrors.nome = "Não pode ser vazio!";
    else if (nome.length < 2) newErrors.nome = "Nome é muito curto";

    if (!validatePreco(preco)) newErrors.preco = "Preço Invalído";

    return newErrors;
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md=3">
            <h3>Atualizar Produto</h3>
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Col}>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    required
                    value={produto.nome}
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
                <Form.Group as={Col}>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    name="descricao"
                    value={produto.descricao}
                    onChange={handleProdutoChange}
                    type="text"
                    placeholder="Descrição"
                    isInvalid={!!errors.descricao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Preço</Form.Label>
                  <Form.Control
                    name="preco"
                    value={produto.preco.toString().replace(".", ",")}
                    onChange={handleProdutoChange}
                    type="text"
                    placeholder="Preço"
                    required
                    isInvalid={!!errors.preco}
                    onBlur={() => {
                      var { preco } = produto;
                      setProduto({
                        ...produto,
                        preco: parseFloat(preco).toFixed(2),
                      });
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.preco}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Categoria Produto</Form.Label>
                  <Form.Control
                    id="categorias"
                    as="select"
                    name="categoriaProduto"
                    onChange={handleProdutoChange}
                    required
                  >
                    {categoriaProdutos.map((tp) => (
                      <option key={tp.id} value={JSON.stringify(tp)}>
                        {tp.nome}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button type="submit">Atualizar Produto</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProdutoComponet;
