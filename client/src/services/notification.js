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

  markAsRead(notificationId) {
    return axios.put(BASE_URL + "/markAsRead/" + notificationId);
  }

  markAllAsRead(userId) {
    return axios.put(BASE_URL + "/markAllAsRead/" + userId);
  }
}

export default new NotificationService();
