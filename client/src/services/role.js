import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/role";

class RoleService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }

  insert(role){
    return axios.post(BASE_URL, role)
  }
  update(role){
    return axios.put(BASE_URL, role)
  }
  delete(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new RoleService();
