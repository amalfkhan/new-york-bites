import express from "express";
import RestaurantsCtrl from "./controllers/restaurants.controller.js";
import ReviewsCtrl from "./controllers/reviews.controller.js";
import UsersCtrl from "./controllers/users.controller.js";

const router = express.Router();

//Route middleware
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);
router.route("/review")
  .post(ReviewsCtrl.apiAddReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);
router.route("/user/register").post(UsersCtrl.apiRegisterUser);
router.route("/user/login").post(UsersCtrl.apiLoginUser);

export default router;