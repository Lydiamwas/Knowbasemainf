import http from "../http-common";

class KbdocsDataService {
  getAll() {
    return http.get("/kbdocs");
  }

  get(id) {
    return http.get(`/kbdocs/${id}`);
  }

  create(data) {
    return http.post("/kbdocs", data);
  }

  update(id, data) {
    return http.put(`/kbdocs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/kbdocs/${id}`);
  }

  deleteAll() {
    return http.delete(`/kbdocs`);
  }

  findByTitle(title) {
    return http.get(`/kbdocs?title=${title}`);
  }
}

export default new KbdocsDataService();
