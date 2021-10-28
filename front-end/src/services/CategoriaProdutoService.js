import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/categoriaproduto`;

class CategoriaProdutoService {
  getCategorias() {
    return axios.get(API_BASE_URL);
  }

  createCategoria(categoria) {
    return axios.post(API_BASE_URL, categoria);
  }

  getCategoriaById(categoriaId) {
    return axios.get(API_BASE_URL + "/" + categoriaId);
  }

  updateCategoria(categoria, categoriaId) {
    return axios.put(API_BASE_URL + "/" + categoriaId, categoria);
  }

  deleteCategoria(categoriaId) {
    return axios.delete(API_BASE_URL + "/" + categoriaId);
  }
}

export default new CategoriaProdutoService();
