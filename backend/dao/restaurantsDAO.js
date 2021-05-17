import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

let restaurants;

class RestaurantsDAO {
  //inital connection to database - call as soon as server starts - @NOTE
  static async injectDB(conn) {
    if (restaurants) {
      return
    } else {
      try {
        restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants"); //env variable points to project -> cluster -> database(sample_restaurants). restaurants is the collection in that - @NOTE
      } catch (e) {
        console.error(`unable to connect to a collection in restaurantsDAO: ${e}`);
      } 
    }
  }

  static async getRestaurants ({ filters = null, page = 0, restaurantsPerPage = 20 } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } } //you don't need this to be an exact match so you have to create a custom filter - @NOTE
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } } //if cuisine in the db is equal to the cuisine in passed in the filter - @NOTE
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }
  
    let cursor
    try {
      cursor = await restaurants.find(query);
    } catch (e) {
      console.error(`unable to execute find command in restaurantsDAO: ${e}`);
      return { restaurants: [], totalNumRestaurants: 0 };
    }

    const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page);
    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);
      return { restaurantsList, totalNumRestaurants };
    } catch (e) {
      console.error(`unable to convert cursor to array, or document count issue: ${e}`);
      return { restaurants: [], totalNumRestaurants: 0 };
    } 
  }

  static async getRestaurantById (id) {
    try {
      const pipeline = [
        {        
          $match: { _id: new ObjectId(id), }
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
            as: "reviews"
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ]
      return await restaurants.aggregate(pipeline).next();
    } catch (e) {
      console.error(`unable to aggregate from pipline: ${e}`);
      throw e;
    }
  }

  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      console.error(`unable to get cuisines: ${e}`);
    }
  }
}


export default RestaurantsDAO;