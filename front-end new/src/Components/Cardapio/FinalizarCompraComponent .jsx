import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { colors, fontFamily } from "../../assets/css/Style";
import InputMask from "react-input-mask";
import axios from "axios";
import iconFechar from "../../assets/img/fechar.png";
import iconVoltar from "../../assets/img/voltar.png";

const FinalizarCompraComponent = ({
  carrinho,
  frete,
  closeModal,
  voltarCarrinho,
}) => {
  const [errors, setErrors] = useState({});
  const [cepValido, setCepValido] = useState(false);
  const [pedido, setPedido] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: {
      cep: "",
      numero: "",
      logradouro: "",
      bairro: "",
      cidade: "",
    },
    carrinho: carrinho.map((prod) => {
      return { id: prod.id };
    }),
    frete: frete,
  });

  const saveProduto = () => {
    console.log(`produto => ${JSON.stringify(pedido)}`);
  };

  const handleProdutoChange = (e, isEndereco) => {
    let { name, value } = e.target;
    let { endereco } = pedido;

    if (isEndereco) {
      endereco[name] = value;
      setPedido((prevState) => ({
        ...prevState,
        endereco,
      }));
    } else {
      setPedido((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

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
      // No errors! Put any logic here for the form submission!
      alert(JSON.stringify(pedido));
    }

    // if (form.checkValidity() === false) {
    //   alert("nao valido");
    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {
    //   event.preventDefault();
    // }

    // const form = event.currentTarget;
    // form.checkValidity();

    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {
    //   saveProduto();

    //   // console.log(`produto => ${JSON.stringify(cliente)}`);

    // closeModal();
    // }
  };
  const complementarCEP = () => {
    let { cep } = pedido.endereco;
    if (cep.replace(/_/g, "").length == 9) {
      axios
        .get("https://brasilapi.com.br/api/cep/v1/" + cep)
        .then(({ data }) => {
          let { endereco } = pedido;
          endereco.bairro = data.neighborhood;
          endereco.cidade = data.city;
          endereco.logradouro = `${data.street} - ${data.city}`;
          setPedido((prevState) => ({
            ...prevState,
            endereco,
          }));
          setCepValido(true);
        })
        .catch(() => {
          setCepValido(false);
          let { endereco } = pedido;
          // endereco.cep = "";
          endereco.bairro = "";
          endereco.logradouro = "";
          setPedido((prevState) => ({
            ...prevState,
            endereco,
          }));
        });
    } else {
      setCepValido(false);

      let { endereco } = pedido;
      endereco.bairro = "";
      endereco.logradouro = "";
      setPedido((prevState) => ({
        ...prevState,
        endereco,
      }));
    }
  };
  const [validated, setValidated] = useState(false);
  const geralStyle = {
    width: "794px",
    backgroundColor: "#FFFFFFF",
  };
  const { insani, mont } = fontFamily;
  const { black, red } = colors;

  const [totalProduto, setTotalProduto] = useState(0);
  const [taxaEntrega, setTaxaEntrega] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const cardStyle = {
    marginTop: "40px",
    width: "100%",
    height: "400px",
    cursor: "pointer",
    backgroundColor: "white",
    // filter: "drop-shadow(10px 10px 30px rgba(0, 0, 0, 0.15))",

    MozBoxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    WebkitBoxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.15)",
  };

  const campo = {
    height: "59px",
    fontSize: "16px",
    fontWeight: "600",
    paddingLeft: "20px",
    ...mont,

    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.06)",
  };

  const subtituloStyle = {
    ...insani,
    ...red,
    height: "37px",
    fontSize: "32px",
    lineHeight: "36px",
    letterSpacing: "1px",
  };

  const tituloStyle = {
    ...insani,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "36px",
    lineHeight: "41px",
    ...red,
    textAlign: "center",
  };

  const findFormErrors = () => {
    const { nome, telefone, email } = pedido;
    const { numero } = pedido.endereco;

    const newErrors = {};
    // name errors
    if (!nome || nome === "") newErrors.nome = "Não pode ser vazio!";
    else if (nome.length < 2) newErrors.nome = "Nome é muito curto";

    if (telefone.replace(/_g/).length != 15)
      newErrors.telefone = "Celular invalido";

    if (!validateEmail(email)) newErrors.email = "Email Invalído";

    if (!cepValido) newErrors.cep = "CEP Invalído";

    if (!numero || numero === "") newErrors.numero = "Não pode ser vazio!";

    return newErrors;
  };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const botaoFinalizar = () => {
    return (
      <Button
        type="submit"
        className="d-flex flex-row justify-content-center align-items-center"
        style={{
          marginTop: "4px",
          width: "174px",
          height: "75px",
          background: "#FDDC00",
          boxShadow: "10px 10px 30px rgba(255, 203, 71, 0.3)",
          borderRadius: "0px",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            ...mont,
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: "20px",
            color: "#E1231D",
          }}
        >
          Finalizar Compra
        </span>
      </Button>
    );
  };

  return (
    <div style={geralStyle} className="d-flex flex-column align-items-center">
      <header
        style={{
          width: "100%",
          height: "90px",
          background: "#FDDC00",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
          borderRadius: "80px 80px 0px 0px",
        }}
        className="d-flex flex-row align-items-center justify-content-around"
      >
        <div onClick={voltarCarrinho}>
          <Image
            style={{
              width: "42px",
              height: "42px",
              cursor: "pointer",
            }}
            src={iconVoltar}
          />
        </div>
        <div>
          <span style={tituloStyle}>
            Finalizar <br />
            Pedido
          </span>
        </div>
        <div onClick={closeModal}>
          <Image
            style={{
              width: "42px",
              height: "42px",
              cursor: "pointer",
            }}
            src={iconFechar}
          />
        </div>
      </header>
      <main
        style={{ padding: "24px 0", width: "100%", backgroundColor: "white" }}
      >
        <div
          style={{
            margin: "auto",
            width: "590px",
          }}
          className="d-flex flex-column align-items-center"
        >
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Group style={{ marginBottom: "30px" }}>
                  <Form.Label style={subtituloStyle}>Informações</Form.Label>
                  <Form.Control
                    style={campo}
                    value={pedido.nome}
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
                <InputMask
                  mask="(99) 99999-9999"
                  value={pedido.telefone}
                  onChange={handleProdutoChange}
                >
                  {(inputProps) => (
                    <Form.Group style={{ marginBottom: "30px" }}>
                      <Form.Control
                        {...inputProps}
                        style={campo}
                        value={pedido.telefone}
                        name="telefone"
                        type="tel"
                        placeholder="Celular"
                        isInvalid={!!errors.telefone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.telefone}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                </InputMask>
                <Form.Group style={{ marginBottom: "30px" }}>
                  <Form.Control
                    style={campo}
                    value={pedido.email}
                    onChange={handleProdutoChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
              <Form.Group>
                <Form.Label style={subtituloStyle}>Endereço</Form.Label>

                <Row>
                  <Col>
                    <InputMask
                      mask="99999-999"
                      value={pedido.endereco.cep}
                      onChange={(e) => handleProdutoChange(e, true)}
                      onBlur={complementarCEP}
                    >
                      {(inputProps) => (
                        <Form.Group>
                          <Form.Control
                            {...inputProps}
                            style={campo}
                            name="cep"
                            type="text"
                            placeholder="CEP"
                            isInvalid={!!errors.cep}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cep}
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                    </InputMask>
                  </Col>

                  <Col>
                    <InputMask
                      mask="999999"
                      value={pedido.endereco.numero}
                      onChange={(e) => handleProdutoChange(e, true)}
                      maskChar=""
                    >
                      {(inputProps) => (
                        <Form.Group>
                          <Form.Control
                            {...inputProps}
                            style={campo}
                            name="numero"
                            type="text"
                            placeholder="Numero"
                            isInvalid={!!errors.numero}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.numero}
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                    </InputMask>
                  </Col>
                </Row>

                <Form.Control
                  style={{ ...campo, marginBottom: "30px" }}
                  name="logradouro"
                  value={pedido.endereco.logradouro}
                  onChange={(e) => handleProdutoChange(e, true)}
                  type="text"
                  placeholder="Rua / Avenida"
                  readOnly
                />
                <Form.Control
                  style={campo}
                  name="bairro"
                  value={pedido.endereco.bairro}
                  onChange={(e) => handleProdutoChange(e, true)}
                  type="text"
                  placeholder="Bairro"
                  readOnly
                />
              </Form.Group>

              <div style={{ marginTop: "48px" }}>{botaoFinalizar()}</div>
            </Form>
          </Container>
        </div>
      </main>

      <footer
        style={{
          width: "794px",
          height: "90px",
          background: "#FDDC00",
          boxShadow: "0px -10px 30px rgba(0, 0, 0, 0.15)",
          borderRadius: "0px 0px 80px 80px",
        }}
      ></footer>
    </div>
  );
};

export default FinalizarCompraComponent;
