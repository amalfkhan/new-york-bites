// requests to backend regarding restaurants
import http from "../http-common";

class RestaurantDataService {
  getAll(currPage = 1, restaurantsPerPage = 100) {
    return http.get(`?page=${currPage}&restaurantsPerPage=${restaurantsPerPage}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  getRandom() {
    return http.get(`/random-restaurant`);
  }

  find(query, by = "name", currPage = 1, restaurantsPerPage = 100) {
    return http.get(`?${by}=${query}&page=${currPage}&restaurantsPerPage=${restaurantsPerPage}`);
  }

  getCuisines() {
    return http.get(`/cuisines`);
  }
}

export default new RestaurantDataService();