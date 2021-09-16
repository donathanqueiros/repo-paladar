import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ProdutoService from "../../../services/ProdutoService";

export default () => {
  const [produtos, setProdutos] = useState([]);
  const history = useHistory();

  const deleteProduto = (id) => {
    ProdutoService.deleteProduto(id).then((res) => {
      console.log(res);

      setProdutos(produtos.filter((produto) => produto.id !== id));
    });
  };

  useEffect(() => {
    ProdutoService.getProdutos().then((res) => {
      setProdutos(res.data);
    });
  }, []);

  const viewProduto = (id) => {
    console.log(id);
    history.push(`/view-produto/${id}`);
  };

  const editProduto = (id) => {
    history.push(`/adm/edit-produto/${id}`);
  };

  return (
    <div>
      <h2 className="text-center">Lista Produtos</h2>
      <div className="row">
        <Link to="/adm/add-produto">
          <button className="btn btn-primary">Add Produto</button>
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
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.preco}</td>
                <td>{produto.categoriaProduto.nome}</td>
                <td>
                  <button
                    onClick={() => editProduto(produto.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteProduto(produto.id)}
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
