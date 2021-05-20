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

  getCuisines(id) {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();