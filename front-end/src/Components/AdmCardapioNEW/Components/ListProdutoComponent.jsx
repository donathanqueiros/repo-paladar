import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProdutoService from "../../../services/ProdutoService";

class ListProdutoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtos: [],
    };

    this.addProduto = this.addProduto.bind(this);
    this.editProduto = this.editProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);
    this.viewProduto = this.viewProduto.bind(this);
  }

  deleteProduto(id) {
    ProdutoService.deleteProduto(id).then((res) => {
      console.log(res);
      this.setState({
        produtos: this.state.produtos.filter((produto) => produto.id !== id),
      });
    });
  }

  viewProduto(id) {
    console.log(id);
    // this.props.history.push(`/view-produto/${id}`);
  }

  editProduto(id) {
    console.log(id);
    // this.props.history.push(`/add-produto/${id}`);
  }

  componentDidMount() {
    ProdutoService.getProdutos().then((res) => {
      this.setState({ produtos: res.data });
    });
  }

  addProduto() {
    // console.log(this.state.produtos);
    // this.props.history.push('/adm/add-produto');
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Lista Produtos</h2>
        <div className="row">
          <Link to="/adm/add-produto">
            <button className="btn btn-primary" onClick={this.addProduto}>
              Add Produto
            </button>
          </Link>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Nome produto </th>
                <th>Descrição Produto </th>
                <th>preco Produto</th>
                <th>Categoria Produto</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.nome}</td>
                  <td>{produto.descricao}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.categoriaProduto.nome}</td>
                  <td>
                    <button
                      onClick={() => this.editProduto(produto.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteProduto(produto.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListProdutoComponent;
