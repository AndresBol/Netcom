import axios from "axios";
const BASE_URL = "http://localhost:81/netcom/notification";

class NotificationService {
  all() {
    return axios.get(BASE_URL);
  }

  insert(notification) {
    return axios.post(BASE_URL, notification);
  }

  getByUserId(userId) {
    return axios.get(BASE_URL + "/getByUserId/" + userId);
  }
}

export default new NotificationService();
