import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/user_ticket";

class UserTicketService {
  getAll() {
    return axios.get(BASE_URL);
  }

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
    // Get logged user from localStorage and set assigned_by if not provided
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser && loggedUser.id && !userTicket.assigned_by) {
      userTicket.assigned_by = loggedUser.id;
    }
    return axios.post(BASE_URL, userTicket);
  }

  delete(id) {
    return axios.delete(BASE_URL + '/' + id);
  }

  deleteByUserId(userId) {
    return axios.delete(BASE_URL + '/deleteByUserId/' + userId);
  }

  getTechnicianWorkload(userId) {
    return axios.get(BASE_URL + '/getTechnicianWorkload/' + userId);
  }
}

export default new UserTicketService();
