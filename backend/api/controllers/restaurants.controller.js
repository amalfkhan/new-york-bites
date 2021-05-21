import RestaurantsDAO from "../../dao/restaurantsDAO.js";
import objectidValidation from "../validation/objectid.validation.js"

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
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

  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {};
      if(!objectidValidation(id)) return res.status(400).json({ error: "invalid restuarant id" });
      const restaurant = await RestaurantsDAO.getRestaurantById(id);
      console.log(restaurant)
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

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines();
      res.json(cuisines);
    } catch (e) {
      console.error(`cuisine retrival issue: ${e}`);
      res.status(500).json({ error: e });
    }
  }

}