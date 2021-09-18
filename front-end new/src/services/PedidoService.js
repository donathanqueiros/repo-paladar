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

  getPedidosFinalizado() {
    return axios.get(EMPLOYEE_API_BASE_URL + "/finalizado");
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

  cancelarPedido(produtoId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + produtoId + "/cancelar");
  }
}

export default new PedidoService();
