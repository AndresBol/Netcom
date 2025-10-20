import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/ticket";
class TicketService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }
  getByCategory(categoryId) {
    return axios.get(BASE_URL + '/getAllTicketsByCategory/' + categoryId);
  }
  getByStatus(statusId) {
    return axios.get(BASE_URL + '/getAllTicketsByStatus/' + statusId);
  }
  insert(ticket){
    return axios.post(BASE_URL, ticket)
  }
  update(ticket){
    return axios.put(BASE_URL, ticket)
  }
  delete(id){
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new TicketService();
