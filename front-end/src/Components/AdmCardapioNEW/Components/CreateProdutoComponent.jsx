import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import TipoProdutoService from './../../../services/TipoProdutoService';

function Teste() {
    const [validated, setValidated] = useState(false);

    const [produto, setProduto] = useState({ nome: "", descricao: "", preco: 0, tipoProduto: {} });
    const [tipoProdutos, setTipoProdutos] = useState([]);




    useEffect(() => {
        TipoProdutoService.getTipoProdutos().then((res) => {
            setTipoProdutos(res.data);
            setProduto(prevState => ({
                ...prevState,
                "tipoProduto": res.data[0]
            }));
        });

    }, [])


    const handleProdutoChange = e => {
        let { name, value } = e.target;
        if (name === "tipoProduto") {
            value = JSON.parse(value);
        }
        setProduto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleSubmit = (event) => {

        const form = event.currentTarget;
        console.log(form.checkValidity());
        if (form.checkValidity() === true) {
            setValidated(true);
        } else {

            // event.preventDefault();
            // event.stopPropagation();
        }





        if (validated) {
            console.log('produto => ' + JSON.stringify(produto));
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
                                <Form.Group as={Col} >
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
                                <Form.Group as={Col} >
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
                                    <Form.Label>Tipo Produto</Form.Label>
                                    <Form.Control as="select" name="tipoProduto" onChange={handleProdutoChange}>
                                        {tipoProdutos.map(tp => {
                                            return <option key={tp.id} value={JSON.stringify(tp)}>{tp.nome}</option>
                                        })}

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