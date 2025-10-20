import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/status";
class StatusService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }

  insert(status){
    return axios.post(BASE_URL, status)
  }
  update(status){
    return axios.put(BASE_URL, status)
  }
  delete(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new StatusService();