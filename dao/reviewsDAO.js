//data access object file directly interfacing with the mongo database
//functions specific to accessing review information

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let reviews;

export default class ReviewsDAO {
  // return - access point for the restaurant collection
  static async injectDB(conn) {
    if (reviews) return;
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
    } catch (e) {
      console.error(`unable to connect to a collection in reviewsDAO: ${e}`);
    }
  }

  // return - status of attempt to add a new review
  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: ObjectId(restaurantId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`unable to post review: ${e}`);
      return { error: e };
    }
  }

  // return - status of attempt to update a review
  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: ObjectId(reviewId) }, // find by user id and review id
        { $set: { text: text, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to update review: ${e}`);
      return { error: e };
    }
  }

  // return - status of attempt to delete a review
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne(
        { user_id: userId, _id: ObjectId(reviewId) } // find by user id and review id
      );
      return deleteResponse;
    } catch (e) {
      console.error(`unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
