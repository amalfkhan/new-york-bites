import http from "../http-common";

class UserDataService {
  registerUser(data) {
    return http.post("/user/register", data);
  }
  
  loginUser(data) {
    return http.post("/user/login", data);
  }
  
  cookiePath() {
    return http.get('/set-cookies');
  }
}


export default new UserDataService();