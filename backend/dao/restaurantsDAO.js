import e from "express";

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
        query = { $text: { $search: filters["name"] } } //anywhere in the text... search for the name passed in the filter - there's no database field, if someone does a text search what fields do you check in mongodb (set up in atlas) - @NOTE
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
      console.error(`unable to convert cursor to array, or document count isse: ${e}`);
      return { restaurants: [], totalNumRestaurants: 0 };
    } 
  }

}


export default RestaurantsDAO;