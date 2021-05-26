// controller fiile seperating restaurant route requests and database access requests 
// functions for high-level restaurant information

import RestaurantsDAO from "../../dao/restaurantsDAO.js";
import objectidValidation from "../validation/objectid.validation.js"

export default class RestaurantsController {

  // get a page worth's of restaurants according to the filters the user has applied
  // return - object containing array or restaurants from database and information on that array
  static async apiGetRestaurants(req, res) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 100;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    
    const filters = {}
    if (req.query.cuisine) filters.cuisine = req.query.cuisine;
    else if (req.query.zipcode) filters.zipcode = req.query.zipcode; 
    else if (req.query.name) filters.name = req.query.name; 

    try {
      const retrievedRestaurants = await RestaurantsDAO.getRestaurants({ filters, page, restaurantsPerPage });
      if (!retrievedRestaurants) {
        console.error(`could not find restaurant: ${id}`);
        return res.status(500).json({ error: e });
      }
      let response = {
        restaurants: retrievedRestaurants.restaurantsList,
        page: page,
        filters: filters,
        enteries_per_page: restaurantsPerPage,
        total_restaurants: retrievedRestaurants.totalNumRestaurants
      }
      res.json(response);
    } catch (e){
      console.error(`restaurants retrival issue: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // get a specific restuarant by the mongodb id in the request
  // id is first validated to ensure it's valid
  // return - single restuarant data from database found by id - reviews not included
  static async apiGetRestaurantById(req, res) {
    try {
      let id = req.params.id || {};
      if(!objectidValidation(id)) return res.status(400).json({ error: "invalid restuarant id" });
      const restaurant = await RestaurantsDAO.getRestaurantById(id);
      if (!restaurant) {
        console.error(`could not find restaurant: ${id}`);
        return res.status(400).json({ error: e });
      }
      res.json(restaurant);
    } catch (e) {
      console.error(`id retrival issue: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // get a random restaurant 
  // return - single random restuarant data from database - reviews not included
  static async apiGetRandomRestaurant(req, res) {
    try {
      const restaurant = await RestaurantsDAO.getRandomRestaurant();
      res.json(restaurant);
    } catch (e) {
      console.error(`random restaurant retrival issue: ${e}`);
      res.status(500).json({ error: e });
    }
  }  

  // get a list of all cuisines associated with restaurants in the database
  // return array of unique cuisines
  static async apiGetRestaurantCuisines(req, res) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines();
      res.json(cuisines);
    } catch (e) {
      console.error(`cuisine retrival issue: ${e}`);
      res.status(500).json({ error: e });
    }
  }

}