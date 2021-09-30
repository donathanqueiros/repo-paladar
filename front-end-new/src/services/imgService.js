import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/img";

class ImgService {
  createImage(base64) {
    return axios.post(EMPLOYEE_API_BASE_URL, base64);
  }
}

export default new ImgService();
