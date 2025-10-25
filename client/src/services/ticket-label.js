import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/ticket_label";

class TicketLabelService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }

  getByCategoryId(category_id) {
    return axios.get(BASE_URL + '/category/' + category_id);
  }

  insert(ticket_label){
    return axios.post(BASE_URL, ticket_label)
  }
  update(ticket_label){
    return axios.put(BASE_URL, ticket_label)
  }
  delete(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new TicketLabelService();