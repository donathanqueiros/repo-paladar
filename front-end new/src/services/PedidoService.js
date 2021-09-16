import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/pedidossimples";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
class PedidoService {
  getPedidos() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }
  getPedidosAndamento() {
    return axios.get(EMPLOYEE_API_BASE_URL + "/andamento");
  }

  despacharPedido(produtoId) {
    return axios.post(EMPLOYEE_API_BASE_URL + "/" + produtoId + "/despachar");
  }

  createPedido(pedido) {
    return axios.post(EMPLOYEE_API_BASE_URL, pedido);
  }

  getPedidoById(produtoId) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + produtoId);
  }

  updatePedido(produto, produtoId) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + produtoId, produto);
  }

  deletePedido(produtoId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + produtoId);
  }
}

export default new PedidoService();
