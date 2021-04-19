import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/tipoproduto";

class TipoProdutoService {

    getTipoProdutos() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createTipoProduto(tipoProduto) {
        return axios.post(EMPLOYEE_API_BASE_URL, tipoProduto);
    }

    getTipoProdutoById(tipoProdutoId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + tipoProdutoId);
    }

    updateTipoProduto(tipoProduto, tipoProdutoId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + tipoProdutoId, tipoProduto);
    }

    deleteTipoProduto(tipoProdutoId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + tipoProdutoId);
    }


}

export default new TipoProdutoService()