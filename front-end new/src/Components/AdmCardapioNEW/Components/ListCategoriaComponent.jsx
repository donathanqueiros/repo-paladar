import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CategoriaProdutoService from "../../../services/CategoriaProdutoService";

const ListProdutoComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const history = useHistory();

  function deleteProduto(id) {
    CategoriaProdutoService.deleteCategoria(id)
      .then((res) => {
        setCategorias(categorias.filter((categoria) => categoria.id !== id));
      })
      .catch((error) => {
        switch (error.response.status) {
          case 409:
            alert(
              "Impossivel Excluir Essa Categoria pois ela possui Produtos vinculados"
            );
            break;

          default:
            break;
        }

      });
  }

  function editProduto(id) {
    history.push(`/adm/edit-categoria/${id}`);
  }

  useEffect(() => {
    CategoriaProdutoService.getCategorias().then((res) => {
      setCategorias(res.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-center">Lista Categorias</h2>
      <div className="row">
        <Link to="/adm/edit-categoria">
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
