import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/img/`;

class ImgService {
  createImage(base64) {
    return axios.post(API_BASE_URL, base64);
  }
}

export default new ImgService();
