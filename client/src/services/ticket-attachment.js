import axios from "axios";
const BASE_URL = "http://localhost:81/netcom/ticket_attachment";

class AttachmentService {
  getByTimelineId(timelineId) {
    return axios.get(`${BASE_URL}/getByTimelineId/${timelineId}`);
  }

  uploadFiles(timelineId, files) {
    const formData = new FormData();
    formData.append("timeline_id", timelineId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }

    return axios.post(`${BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  

  delete(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
}

export default new AttachmentService();
