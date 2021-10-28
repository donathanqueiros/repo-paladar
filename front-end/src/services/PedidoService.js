import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/pedidos`;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
class PedidoService {
  getPedidos() {
    return axios.get(API_BASE_URL + "/");
  }
  getPedidosAndamento() {
    return axios.get(API_BASE_URL + "/andamento/");
  }

  getPedidosFinalizado() {
    return axios.get(API_BASE_URL + "/finalizado/");
  }

  despacharPedido(produtoId) {
    return axios.post(API_BASE_URL + "/" + produtoId + "/despachar/");
  }

  createPedido(pedido) {
    return axios.post(API_BASE_URL + "/", pedido);
  }

  getPedidoById(pedidoId) {
    return axios.get(API_BASE_URL + "/" + pedidoId + "/");
  }

  cancelarPedido(pedidoId) {
    return axios.delete(API_BASE_URL + "/" + pedidoId + "/cancelar/");
  }
}

export default new PedidoService();
