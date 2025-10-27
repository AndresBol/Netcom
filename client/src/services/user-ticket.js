import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/user_ticket";

class UserTicketService {
  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }

  getByUserId(userId) {
    return axios.get(BASE_URL + '/getByUserId/' + userId);
  }

  getByTicketId(ticketId) {
    return axios.get(BASE_URL + '/getByTicketId/' + ticketId);
  }

  insert(userTicket) {
    return axios.post(BASE_URL, userTicket);
  }

  delete(id) {
    return axios.delete(BASE_URL + '/' + id);
  }

  deleteByUserId(userId) {
    return axios.delete(BASE_URL + '/deleteByUserId/' + userId);
  }
}

export default new UserTicketService();
