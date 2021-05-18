import http from "../http-common";

class RestaurantDataService {
  getAll(currPage = 1, restaurantsPerPage = 100) {
    return http.get(`?page=${currPage}&restaurantsPerPage=${restaurantsPerPage}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = "name", currPage = 1, restaurantsPerPage = 100) {
    return http.get(`?${by}=${query}&page=${currPage}&restaurantsPerPage=${restaurantsPerPage}`);
  }

  createReview(data) {
    return http.post("/review", data);
  }
  
  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`, { data: {user_id: userId} });
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();