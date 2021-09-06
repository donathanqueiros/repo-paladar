import React, { Component } from "react";
import TipoProdutoService from "../../../services/TipoProdutoService";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nome: "",
      descricao: "",
      preco: "",
      tipoProdutos: [],
      value: {
        tipoProduto: {},
      },
    };

    this.changenomeHandler = this.changenomeHandler.bind(this);
    this.changedescricaoHandler = this.changedescricaoHandler.bind(this);
    this.changeprecoHandler = this.changeprecoHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    this.changeTipoProdutoHandler = this.changeTipoProdutoHandler.bind(this);
  }

  componentDidMount() {
    TipoProdutoService.getTipoProdutos().then((res) => {
      this.setState({ tipoProdutos: res.data });
      this.setState({ value: { tipoProduto: res.data[0] } });
    });

    // EmployeeService.getEmployeeById(this.state.id).then(res => {
    // let produto = res.data;
    // this.setState({
    // nome: produto.nome,
    // descricao: produto.descricao,
    // preco: produto.preco
    // });
    // });
  }

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    let produto = {
      nome: this.state.nome,
      descricao: this.state.descricao,
      preco: this.state.preco,
      tipoProduto: this.state.value.tipoProduto,
    };

    console.log("produto => " + JSON.stringify(produto));

    // step 5
    // EmployeeService.createEmployee(produto).then(res => {
    //     this.props.history.push('/produtos');
    // });
  };

  changenomeHandler(event) {
    this.setState({ nome: event.target.value });
  }

  changedescricaoHandler(event) {
    this.setState({ descricao: event.target.value });
  }
  changeprecoHandler(event) {
    this.setState({ preco: event.target.value });
  }

  changeTipoProdutoHandler(event) {
    this.setState({ value: { tipoProduto: JSON.parse(event.target.value) } });
  }

  cancel() {
    this.props.history.push("/produtos");
  }

  getTitle() {
    return <h3 className="text-center">Adicionar Produto</h3>;
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md=3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group ">
                    <label>Nome Produto: </label>
                    <input
                      required
                      placeholder="Nome Produto"
                      name="nome"
                      className="form-control"
                      value={this.state.nome}
                      onChange={this.changenomeHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Descricão Produto: </label>
                    <input
                      placeholder="Descricão Produto:"
                      name="descricao"
                      className="form-control"
                      value={this.state.descricao}
                      onChange={this.changedescricaoHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preço Produto</label>
                    <input
                      placeholder="Preço Produto"
                      name="preco"
                      className="form-control"
                      value={this.state.preco}
                      onChange={this.changeprecoHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Categoria Produto</label>
                    <select
                      className="form-control col-12 "
                      onChange={this.changeTipoProdutoHandler}
                    >
                      {this.state.tipoProdutos.map((tp) => {
                        return (
                          <option key={tp.id} value={JSON.stringify(tp)}>
                            {tp.nome}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateEmployee}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreateEmployeeComponent;
