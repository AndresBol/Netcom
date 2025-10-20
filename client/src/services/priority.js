import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/priority";

class PriorityService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }

  insert(priority){
    return axios.post(BASE_URL, priority)
  }
  update(priority){
    return axios.put(BASE_URL, priority)
  }
  delete(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new PriorityService();