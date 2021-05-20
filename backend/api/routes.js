import express from "express";
import RestaurantsCtrl from "./controllers/restaurants.controller.js";
import ReviewsCtrl from "./controllers/reviews.controller.js";
import UsersCtrl from "./controllers/users.controller.js";
import tokenValidation from "./validation/token.validation.js";

const router = express.Router();

//Route middleware
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);
router.route("/review")
  .post(tokenValidation, ReviewsCtrl.apiAddReview)
  .put(tokenValidation, ReviewsCtrl.apiUpdateReview)
  .delete(tokenValidation, ReviewsCtrl.apiDeleteReview);
router.route("/user/register").post(UsersCtrl.apiRegisterUser);
router.route("/user/login").post(UsersCtrl.apiLoginUser);

router.route("/set-cookies").get((req, res) => {
  res
  .setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  .cookie("newUser", "true")
  .json({teetoo: 'cookies-set'});
});

export default router;