import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { colors, fontFamily } from "../../assets/css/Style";
import InputMask from "react-input-mask";
import axios from "axios";

const FinalizarCompraComponent = ({ carrinho, closeModal }) => {
  const [cepValido, setCepValido] = useState(false);
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
    },
    carrinho: { ...carrinho },
  });

  const saveProduto = () => {
    console.log(`produto => ${JSON.stringify(cliente)}`);
  };

  const handleProdutoChange = (e, isEndereco) => {
    let { name, value } = e.target;
    let { endereco } = cliente;

    if (isEndereco) {
      endereco[name] = value;
      setCliente((prevState) => ({
        ...prevState,
        endereco,
      }));
    } else {
      setCliente((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    form.checkValidity();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      saveProduto();

      // console.log(`produto => ${JSON.stringify(cliente)}`);
      event.preventDefault();
      closeModal();
    }
  };
  const complementarCEP = () => {
    let { cep } = cliente.endereco;
    if (cep.replace(/_/g, "").length == 9) {
      axios
        .get("https://brasilapi.com.br/api/cep/v1/" + cep)
        .then(({ data }) => {
          let { endereco } = cliente;
          endereco.bairro = data.neighborhood;
          endereco.cidade = data.city;
          endereco.logradouro = `${data.street} - ${data.city}`;
          setCliente((prevState) => ({
            ...prevState,
            endereco,
          }));
          setCepValido(true);
        })
        .catch(() => {
          setCepValido(false);
          let { endereco } = cliente;
          // endereco.cep = "";
          endereco.bairro = "";
          endereco.logradouro = "";
          setCliente((prevState) => ({
            ...prevState,
            endereco,
          }));
        });
    } else {
      setCepValido(false);

      let { endereco } = cliente;
      endereco.bairro = "";
      endereco.logradouro = "";
      setCliente((prevState) => ({
        ...prevState,
        endereco,
      }));
    }
  };
  const [validated, setValidated] = useState(true);
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
    marginBottom: "30px",
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
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    height: "50px",
    ...black,
    ...insani,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "24px",
    width: "223px",
    height: "82px",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "36px",
    lineHeight: "41px",
    textAlign: "center",
    ...red,
  };

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
        className="d-flex justify-content-around"
      >
        <span style={tituloStyle}>Finalizar Pedido</span>
      </header>
      <body style={{ padding: "24px 0", width: "100%" }}>
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
                <Form.Label style={subtituloStyle}>Informações</Form.Label>
                <Form.Control
                  style={campo}
                  required
                  value={cliente.nome}
                  onChange={handleProdutoChange}
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  isInvalid={cliente.nome.length < 3}
                  isValid={cliente.nome.length > 3}
                />

                <InputMask
                  mask="(99) 99999-9999"
                  value={cliente.telefone}
                  onChange={handleProdutoChange}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      style={campo}
                      value={cliente.telefone}
                      name="telefone"
                      type="tel"
                      placeholder="telefone"
                      required
                      isValid={cliente.telefone.replace(/_/g, "").length === 15}
                      isInvalid={
                        !(cliente.telefone.replace(/_/g, "").length === 15)
                      }
                    />
                  )}
                </InputMask>
                <Form.Control
                  style={campo}
                  required
                  value={cliente.email}
                  onChange={handleProdutoChange}
                  onBlur={() => {
                    let { email } = cliente;
                    email = email.trim();
                    console.log(email);
                    setCliente((prevState) => ({
                      ...prevState,
                      email,
                    }));
                  }}
                  name="email"
                  type="email"
                  placeholder="Email"
                  isValid={
                    cliente.email.includes("@") &&
                    cliente.email.includes(".") &&
                    !cliente.email.includes(" ")
                  }
                  isInvalid={
                    !cliente.email.includes("@") ||
                    !cliente.email.includes(".") ||
                    cliente.email.includes(" ")
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={subtituloStyle}>Endereço</Form.Label>

                <Row>
                  <Col>
                    <InputMask
                      mask="99999-999"
                      value={cliente.endereco.cep}
                      onChange={(e) => handleProdutoChange(e, true)}
                      onBlur={complementarCEP}
                    >
                      {(inputProps) => (
                        <Form.Control
                          {...inputProps}
                          style={campo}
                          name="cep"
                          type="text"
                          placeholder="CEP"
                          isValid={cepValido}
                          isInvalid={!cepValido}
                        />
                      )}
                    </InputMask>
                  </Col>

                  <Col>
                    <InputMask
                      mask="999999"
                      value={cliente.endereco.numero}
                      onChange={(e) => handleProdutoChange(e, true)}
                      maskChar=""
                    >
                      {(inputProps) => (
                        <Form.Control
                          {...inputProps}
                          style={campo}
                          name="numero"
                          type="text"
                          placeholder="Numero"
                        />
                      )}
                    </InputMask>
                  </Col>
                </Row>

                <Form.Control
                  style={campo}
                  name="logradouro"
                  value={cliente.endereco.logradouro}
                  onChange={(e) => handleProdutoChange(e, true)}
                  type="text"
                  placeholder="Rua / Avenida"
                  readOnly
                />
                <Form.Control
                  style={campo}
                  name="bairro"
                  value={cliente.endereco.bairro}
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
      </body>

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
