import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/user";

class UserService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  getByEmail(email) {
    return axios.get(BASE_URL + '/getUserByEmail/' + email);
  }

  insert(user){
    return axios.post(BASE_URL, user)
  }
  update(user){
    return axios.put(BASE_URL, user)
  }
  updateLastLogin(id){
    return axios.put(BASE_URL + '/updateLastLogin/' + id)
  }
  delete(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new UserService();
