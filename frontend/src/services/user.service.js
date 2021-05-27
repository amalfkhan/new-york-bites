// requests to backend regarding users

import http from "./http-common";

class UserDataService {
  loggedInUser(data) {
    return http.get("/user/loggedIn", data);
  }

  registerUser(data) {
    return http.post("/user/register", data);
  }

  loginUser(data) {
    return http.post("/user/login", data);
  }

  logoutUser(data) {
    return http.get("/user/logout", data);
  }
}

export default new UserDataService();
