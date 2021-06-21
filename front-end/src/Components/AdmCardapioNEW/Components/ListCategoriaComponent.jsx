import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CategoriaService from "../../../services/CategoriaService";

const ListProdutoComponent = () => {
  const [categorias, setCategorias] = useState([]);

  function deleteProduto(id) {
    console.log(id);
    // ProdutoService.deleteProduto(id).then((res) => {
    //   console.log(res);
    //   this.setState({
    //     produtos: this.state.produtos.filter((produto) => produto.id !== id),
    //   });
    // });
  }

  function editProduto(id) {
    console.log(id);
    // this.props.history.push(`/add-produto/${id}`);
  }

  useEffect(() => {
    CategoriaService.getCategorias().then((res) => {
      setCategorias(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-center">Lista Categorias</h2>
      <div className="row">
        <Link to="/adm/add-produto">
          <button className="btn btn-primary">Add Categoria</button>
        </Link>
      </div>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nome produto </th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td>
                <td>
                  <button
                    onClick={() => editProduto(categoria.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteProduto(categoria.id)}
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
};

export default ListProdutoComponent;
