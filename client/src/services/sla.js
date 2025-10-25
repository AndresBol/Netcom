import axios from "axios";
const BASE_URL = "http://localhost:81/netcom/sla";

class SlaService {
  getAll() {
    return axios.get(BASE_URL);
  }
  getById(id) {
    return axios.get(BASE_URL + "/" + id);
  }

  getByCategory(categoryId) {
    return axios.get(BASE_URL + "/getByCategory/" + categoryId);
  }

  getByPriority(priorityId) {
    return axios.get(BASE_URL + "/getByPriority/" + priorityId);
  }

  insert(sla) {
    return axios.post(BASE_URL, sla);
  }

  update(sla) {
    return axios.put(BASE_URL, sla);
  }

  delete(id) {
    return axios.delete(BASE_URL + "/" + id);
  }
}

export default new SlaService();
