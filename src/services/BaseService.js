import axios from '../utils/axios';

class BaseService {
  postData(url, data, config) {
    return axios.post(url, data, config);
  }

  getData(path, config) {
    return axios.get(path, config);
  }

  putData(path, data, config) {
    return axios.put(path, data, config);
  }

  deleteData(path) {
    return axios.delete(path);
  }
}

export default new BaseService();
