import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/produtos";

class ProdutoService {
  getProdutos() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }

  createProduto(produto) {
    return axios.post(EMPLOYEE_API_BASE_URL, produto);
  }

  getProdutoById(produtoId) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + produtoId);
  }

  updateProduto(produto, produtoId) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + produtoId, produto);
  }

  deleteProduto(produtoId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + produtoId);
  }
}

export default new ProdutoService();
