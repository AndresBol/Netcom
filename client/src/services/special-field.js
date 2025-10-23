import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/special_field";

class SpecialFieldService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  getByCategory(categoryId) {
    return axios.get(BASE_URL + '/getAllSpecialFieldsByCategory/' + categoryId);
  }

  insert(specialField){
    return axios.post(BASE_URL, specialField)
  }
  update(specialField){
    return axios.put(BASE_URL, specialField)
  }
  delete(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new SpecialFieldService();
