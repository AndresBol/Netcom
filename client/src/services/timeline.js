import axios from 'axios';
const BASE_URL = "http://localhost:81/netcom/timeline";

class TimelineService {
  getAll() {
    return axios.get(BASE_URL);
  }

  getById(id) {
    return axios.get(BASE_URL + '/' + id);
  }

  getAllByTicketId(ticketId) {
    return axios.get(BASE_URL + '/getAllByTicketId/' + ticketId);
  }

  insert(timeline) {
    return axios.post(BASE_URL, timeline);
  }

  update(timeline) {
    return axios.put(BASE_URL, timeline);
  }

  delete(id) {
    return axios.delete(BASE_URL + '/' + id);
  }
}

export default new TimelineService();
