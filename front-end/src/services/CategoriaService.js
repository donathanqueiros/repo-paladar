import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/categoriaproduto";

class CategoriaService {
  getCategorias() {
    return axios.get(EMPLOYEE_API_BASE_URL);
  }

  createCategoria(categoria) {
    return axios.post(EMPLOYEE_API_BASE_URL, categoria);
  }

  getCategoriaById(categoriaId) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + categoriaId);
  }

  updateCategoria(categoria, categoriaId) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + categoriaId, categoria);
  }

  deleteCategoria(categoriaId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + categoriaId);
  }
}

export default new CategoriaService();
