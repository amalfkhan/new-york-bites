// controller fiile seperating reviews route requests and database access requests
// functions for review information

import ReviewsDao from "../../dao/reviewsDAO.js";

export default class ReviewsController {
  // return - status of database insertion attempt
  static async apiAddReview(req, res) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const reviewResponse = await ReviewsDao.addReview(
        restaurantId,
        userInfo,
        review,
        date
      );
      res.json(reviewResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // return - status of attempt to update a review
  static async apiUpdateReview(req, res) {
    try {
      const userId = req.body.user_id;
      const reviewId = req.body.review_id;
      const text = req.body.text;
      const date = new Date();
      const reviewResponse = await ReviewsDao.updateReview(
        reviewId,
        userId,
        text,
        date
      );
      if (reviewResponse.error)
        res.status(500).json({ error: reviewResponse.error });
      if (reviewResponse.modifiedCount === 0)
        res.status(500).json({ error: "unable to update review" });
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // return - status of attempt to delete a review
  static async apiDeleteReview(req, res) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;
      const reviewResponse = await ReviewsDao.deleteReview(reviewId, userId);
      if (reviewResponse.error)
        res.status(500).json({ error: reviewResponse.error });
      res.json(reviewResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
