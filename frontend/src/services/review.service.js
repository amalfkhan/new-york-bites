import http from "../http-common";

class ReviewDataServices {
  createReview(data) {
    return http.post("/review", data);
  }
  
  updateReview(data) {
    return http.put("/review", data);
  }

  deleteReview(id, userId) {
    return http.delete(`/review?id=${id}`, { data: {user_id: userId} });
  }
}

export default new ReviewDataServices();