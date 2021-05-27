// access points for api
import express from "express";
import RestaurantsCtrl from "./controllers/restaurants.controller.js";
import ReviewsCtrl from "./controllers/reviews.controller.js";
import UsersCtrl from "./controllers/users.controller.js";
import tokenValidation from "./validation/token.validation.js";

const router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);
router.route("/random-restaurant").get(RestaurantsCtrl.apiGetRandomRestaurant);
router
  .route("/review")
  .post(tokenValidation, ReviewsCtrl.apiAddReview)
  .put(tokenValidation, ReviewsCtrl.apiUpdateReview)
  .delete(tokenValidation, ReviewsCtrl.apiDeleteReview);
router.route("/user/loggedIn").get(UsersCtrl.apiLoggedInUser);
router.route("/user/register").post(UsersCtrl.apiRegisterUser);
router.route("/user/login").post(UsersCtrl.apiLoginUser);
router.route("/user/logout").get(UsersCtrl.apiLogoutUser);

export default router;
