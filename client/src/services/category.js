import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/category";
class CategoryService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }

  insert(category){
    return axios.post(BASE_URL, category)
  }
  update(category){
    return axios.put(BASE_URL, category)
  }
  delete(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new CategoryService();