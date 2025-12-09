import axios from "axios";
const BASE_URL = "http://localhost:81/netcom/sla-report";

class SlaReportService {
  getResponseReport() {
    return axios.get(BASE_URL + "/response");
  }

  getResolutionReport() {
    return axios.get(BASE_URL + "/resolution");
  }

  getCategoryBreaches() {
    return axios.get(BASE_URL + "/category-breaches");
  }
}

export default new SlaReportService();
