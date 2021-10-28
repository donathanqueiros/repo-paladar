import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/produtos`;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

class ProdutoService {
  getProdutos() {
    return axios.get(API_BASE_URL + "/");
  }

  maisVendidos() {
    return axios.get(API_BASE_URL + "/maisvendidos/");
  }

  createProduto(produto) {
    return axios.post(API_BASE_URL + "/", produto);
  }

  getProdutoById(produtoId) {
    return axios.get(API_BASE_URL + "/" + produtoId + "/");
  }

  updateProduto(produto, produtoId) {
    return axios.put(API_BASE_URL + "/" + produtoId + "/", produto);
  }

  desativarProduto(produtoId) {
    return axios.patch(API_BASE_URL + "/" + produtoId + "/desativar");
  }
  ativarProduto(produtoId) {
    return axios.patch(API_BASE_URL + "/" + produtoId + "/ativar");
  }
  deleteProduto(produtoId) {
    return axios.delete(API_BASE_URL + "/" + produtoId + "/");
  }
}

export default new ProdutoService();
