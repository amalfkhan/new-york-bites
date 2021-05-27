//data access object file directly interfacing with the mongo database
//functions specific to accessing high-level restuarant information

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let restaurants;

class RestaurantsDAO {
  // connect to restaurants collection in database
  // return - access point for the restaurant collection
  static async injectDB(conn) {
    if (restaurants) {
      return;
    } else {
      try {
        restaurants = await conn
          .db(process.env.RESTREVIEWS_NS)
          .collection("restaurants");
      } catch (e) {
        console.error(
          `unable to connect to a collection in restaurantsDAO: ${e}`
        );
        return { error: e };
      }
    }
  }

  // query database for a page worth of restaurants based on parameters
  // return - all restaurants that match query filters, reviews not included
  static async getRestaurants({
    filters = null,
    page = 1,
    restaurantsPerPage = 66,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }; // the name text from database just needs to contain the query text
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } }; // cuisine needs to be an exact match
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }; // zipcode needs to be an exact match
      }
    }

    let cursor;
    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`unable to execute find command in restaurantsDAO: ${e}`);
      return { restaurants: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * (page - 1)); // change cursor so it returns a page's worth of restaurants, and skips to the correct page
    try {
      const restaurantsList = await displayCursor.toArray(); // turn cursor data into array of restaurant documents returned
      const totalNumRestaurants = await restaurants.countDocuments(query);
      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(
        `unable to convert cursor to array, or document count issue: ${e}`
      );
      return { restaurants: [], totalNumRestaurants: 0 };
    }
  }

  // query database based on mongodb object id
  // return - restaurant data based on inputed id and it's reviews
  static async getRestaurantById(id) {
    try {
      const restaurantData = await restaurants.findOne({
        _id: new ObjectId(id),
      });
      if (!restaurantData) return null;
    } catch (e) {
      return { error: e };
    }

    try {
      const pipeline = [
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];
      return await restaurants.aggregate(pipeline).next(); // perform transformations on database data based on the defined pipeline
    } catch (e) {
      console.error(`unable to aggregate from pipline: ${e}`);
      return { error: e };
    }
  }

  // query database to return a single random restaurant - no other restrictions are applied
  // random restaurant data and it's reviews
  static async getRandomRestaurant() {
    try {
      var restaurantData = await restaurants
        .aggregate([{ $sample: { size: 1 } }])
        .toArray();
      if (!restaurantData) return null;
    } catch (e) {
      return { error: e };
    }

    try {
      const pipeline = [
        {
          $match: { _id: new ObjectId(restaurantData[0]._id) },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  date: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];
      return await restaurants.aggregate(pipeline).next(); // perform transformations on database data based on the defined pipeline
    } catch (e) {
      console.error(`unable to aggregate from pipline: ${e}`);
      return { error: e };
    }
  }

  // access all restaurants in database and return the unique cuisines
  // return - array of cuisines
  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      console.error(`unable to get cuisines: ${e}`);
      return { error: e };
    }
  }
}

export default RestaurantsDAO;
