import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { colors, fontFamily } from "../../assets/css/Style";
import InputMask from "react-input-mask";
import axios from "axios";
import iconFechar from "../../assets/img/fechar.png";
import iconVoltar from "../../assets/img/voltar.png";
import PedidoService from "../../services/PedidoService";
import useLoading from "../../hooks/useLoading";
import useMessage from "../../hooks/useMessage";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import styled from "styled-components";

const FinalizarCompraComponent = ({
  frete,
  closeModal,
  voltarCarrinho,
  observacao,
}) => {
  const { LoadingModal, esconderLoading, mostrarLoading } = useLoading();
  const { sucess, error, warning } = useMessage();
  const [carrinho] = useContext(CarrinhoContext);

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
      estado: "",
    },
    observacao,
    carrinho: carrinho?.map((prod) => prod?.id),
    frete: frete,
  });

  const criarPedido = () => {
    mostrarLoading();
    var pedidoManipulado = {
      ...pedido,
      endereco: {
        ...pedido.endereco,
        cep: pedido.endereco.cep.replace("-", ""),
      },
    };

    PedidoService.createPedido(pedidoManipulado)
      .then((e) => {
        sucess("Pedido feito com sucesso");
        closeModal();
      })
      .catch((e) =>
        error(
          "Erro ao efetuar o pedido, por favor entrar em contato por telefone"
        )
      )
      .finally(esconderLoading);
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

  useEffect(() => {
    console.log(pedido);
  }, [pedido]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      criarPedido();
    }
  };
  const complementarCEP = () => {
    let { cep } = pedido.endereco;
    if (cep.replace(/_/g, "").length == 9) {
      mostrarLoading();
      axios
        .get("https://brasilapi.com.br/api/cep/v1/" + cep)
        .then(({ data }) => {
          let { endereco } = pedido;
          endereco.bairro = data.neighborhood;
          endereco.cidade = data.city;
          endereco.logradouro = data.street;
          endereco.estado = data.state;

          setPedido((prevState) => ({
            ...prevState,
            endereco,
          }));
          setCepValido(true);
        })
        .catch(() => {
          warning("CEP invalido");
          setCepValido(false);
          let { endereco } = pedido;
          endereco.bairro = "";
          endereco.logradouro = "";
          endereco.cidade = "";
          endereco.estado = "";
          setPedido((prevState) => ({
            ...prevState,
            endereco,
          }));
        })
        .finally(esconderLoading);
    } else {
      setCepValido(false);

      let { endereco } = pedido;
      endereco.bairro = "";
      endereco.logradouro = "";
      endereco.cidade = "";
      endereco.estado = "";
      setPedido((prevState) => ({
        ...prevState,
        endereco,
      }));
    }
  };
  const { insani, mont } = fontFamily;
  const { red } = colors;

  const campoStyle = {
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

    if (!!frete) {
      if (!cepValido) newErrors.cep = "CEP Invalído";
      if (!numero || numero === "") newErrors.numero = "Não pode ser vazio!";
    }

    return newErrors;
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
          cursor: "pointer",
          borderRadius: "10px",
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
    <>
      <StyledContainer fluid>
        <Header>
          <Col className="d-flex justify-content-around align-items-center">
            <Image
              style={{
                width: "42px",
                height: "42px",
                cursor: "pointer",
              }}
              onClick={voltarCarrinho}
              src={iconVoltar}
            />
            <span style={tituloStyle}>
              Finalizar <br />
              Pedido
            </span>
            <Image
              style={{
                width: "42px",
                height: "42px",
                cursor: "pointer",
              }}
              onClick={closeModal}
              src={iconFechar}
            />
          </Col>
        </Header>
        <Body>
          <div
            style={{
              margin: "auto",
              maxWidth: "590px",
            }}
            className="d-flex flex-column align-items-center"
          >
            <Container>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Group style={{ marginBottom: "30px" }}>
                    <Form.Label style={subtituloStyle}>Informações</Form.Label>
                    <Form.Control
                      style={campoStyle}
                      value={pedido?.nome}
                      onChange={(e) => handleProdutoChange(e)}
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
                    onChange={(e) => handleProdutoChange(e)}
                  >
                    {(inputProps) => (
                      <Form.Group style={{ marginBottom: "30px" }}>
                        <Form.Control
                          {...inputProps}
                          style={campoStyle}
                          value={pedido?.telefone}
                          name="telefone"
                          onChange={(e) => handleProdutoChange(e)}
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
                      style={campoStyle}
                      value={pedido?.email}
                      onChange={(e) => handleProdutoChange(e)}
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
                {frete && (
                  <Form.Group>
                    <Form.Label style={subtituloStyle}>Endereço</Form.Label>

                    <Row>
                      <Col>
                        <InputMask
                          mask="99999-999"
                          value={pedido?.endereco?.cep}
                          onChange={(e) => {
                            handleProdutoChange(e, true);
                            if (
                              pedido?.endereco.cep.replace(/_/g, "").length == 9
                            ) {
                              complementarCEP();
                            }
                          }}
                          onBlur={complementarCEP}
                        >
                          {(inputProps) => (
                            <Form.Group>
                              <Form.Control
                                {...inputProps}
                                style={campoStyle}
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
                          value={pedido?.endereco?.numero}
                          onChange={(e) => handleProdutoChange(e, true)}
                          maskChar=""
                        >
                          {(inputProps) => (
                            <Form.Group style={{ marginBottom: "30px" }}>
                              <Form.Control
                                {...inputProps}
                                style={campoStyle}
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
                      style={{ ...campoStyle, marginBottom: "30px" }}
                      name="logradouro"
                      value={`${pedido?.endereco?.logradouro} - ${pedido?.endereco?.cidade} - ${pedido?.endereco?.estado} `}
                      onChange={(e) => handleProdutoChange(e, true)}
                      type="text"
                      placeholder="Rua / Avenida"
                      readOnly
                    />
                    <Form.Control
                      style={campoStyle}
                      name="bairro"
                      value={pedido?.endereco?.bairro}
                      onChange={(e) => handleProdutoChange(e, true)}
                      type="text"
                      placeholder="Bairro"
                      readOnly
                    />
                  </Form.Group>
                )}

                <div
                  className="d-flex justify-content-end"
                  style={{ marginTop: "48px" }}
                >
                  {botaoFinalizar()}
                </div>
              </Form>
            </Container>
          </div>
        </Body>
        <Footer />
      </StyledContainer>
      <LoadingModal />
    </>
  );
};

const StyledContainer = styled(Container)`
  max-width: 794px;
`;
const Header = styled(Row)`
  height: 90px;
  background: #fddc00;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 80px 80px 0px 0px;

  @media (max-width: 794px) {
    border-radius: 0px;
  }
`;

const Body = styled(Row)`
  padding: 24px 0;
  background-color: white;
`;
const Footer = styled(Row)`
  height: 90px;
  background: #fddc00;
  box-shadow: 0px -10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 80px 80px;

  @media (max-width: 794px) {
    border-radius: 0px;
  }
`;

export default FinalizarCompraComponent;
