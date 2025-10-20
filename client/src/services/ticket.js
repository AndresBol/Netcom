import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/ticket";
class TicketService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(ticketId) {
    return axios.get(BASE_URL + '/' + ticketId);
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
  delete(ticketId){
    return axios.delete(BASE_URL + '/' + ticketId);
  }
}

export default new TicketService();
