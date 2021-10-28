import React, { useEffect, useState, useRef } from "react";
import { Col, Form, Button, Image, Row, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ProdutoService from "../../../services/ProdutoService";
import CategoriaProdutoService from "../../../services/CategoriaProdutoService";
import imgService from "../../../services/imgService";
import useLoading from "../../../hooks/useLoading";
import useMessage from "../../../hooks/useMessage";

const CreateProdutoComponent = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: parseFloat(0),
    categoriaProduto: {},
    imgProduto: {
      id: "",
      src: "",
    },
  });
  const [categoriaProdutos, setCategoriaProdutos] = useState([]);
  const { LoadingModal, esconderLoading, mostrarLoading } = useLoading();
  const { sucess, error } = useMessage();

  useEffect(() => {
    CategoriaProdutoService.getCategorias().then((res) => {
      setCategoriaProdutos(res.data);
      setProduto((prevState) => ({
        ...prevState,
        categoriaProduto: res.data[0],
      }));
    });
  }, []);

  const salvarProduto = () => {
    mostrarLoading();
    console.log(img);
    imgService
      .createImage(img.substring(img.indexOf(",") + 1, img.length))
      .then((res) => {
        var imgSalva = res.data;

        setProduto((prevState) => ({
          ...prevState,
          imgProduto: {
            id: imgSalva.id,
            src: imgSalva.src,
          },
        }));

        var produtoStatic = {
          ...produto,
          imgProduto: {
            id: imgSalva.id,
            src: imgSalva.src,
          },
        }

        ProdutoService.createProduto(produtoStatic)
          .then(() => {
            sucess("produto criado com sucesso");
            history.push("/adm/form/produtos");
          })
          .catch((e) => error("Erro ao criar o produto"));
      })
      .catch((e) => {
        error("erro ao enviar imagem");
      })
      .finally(esconderLoading());
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
      salvarProduto();
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

  const imgStyle = {
    width: "387px",
    height: "224px",
    marginBottom: "16px",
  };

  const [img, setImg] = useState("");

  function getBase64(file) {
    try {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setImg(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
        setImg("");
      };
    } catch (e) {
      setImg("");
    }
  }

  function clearInputFile(file) {
    if (file?.type != "image/png" && file?.type != "image/jpeg" && file?.type != "image/jpg") {
      document.getElementById("file-input").value = "";
      alert("arquivo invalido");
    }
  }

  return (
    <Container>
      <Row>
        <h3 className="d-flex justify-content-center">Adicionar Produto</h3>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row className="d-flex justify-content-center">
          <Image style={imgStyle} src={img}></Image>
          <Form.Group className="d-flex justify-content-center">
            <Form.Control
              id="file-input"
              required
              type="file"
              accept=".jpeg,.png,.jpg"
              onChange={(e) => {
                var file = e.target.files[0];
                clearInputFile(file);
                getBase64(file);
              }}
            />
          </Form.Group>
        </Row>

        <Row className="d-flex justify-content-center">
          <Form.Group as={Col} md={6}>
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
        </Row>

        <Row className="d-flex justify-content-center">
          <Form.Group as={Col} md={6}>
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
        </Row>

        <Row className="d-flex justify-content-center">
          <Form.Group as={Col} md={6}>
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
        </Row>

        <Row className="d-flex justify-content-center">
          <Form.Group as={Col} md={6}>
            <Form.Label>Categoria Produto</Form.Label>
            <Form.Control
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
        </Row>

        <Row className="d-flex justify-content-end">
          <Col md={{ offset: 3, span: 0 }}>
            <Button
              variant="secondary"
              onClick={() => history.push("/adm/form/produtos")}
            >
              Cancelar
            </Button>
          </Col>
          <Col md={{ offset: 0, span: 5 }}>
            <Button type="submit">Adicionar Produto</Button>
          </Col>
        </Row>
      </Form>
      <LoadingModal />
    </Container>
  );
};

export default CreateProdutoComponent;
