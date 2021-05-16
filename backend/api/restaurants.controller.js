import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    
    //create a filters object
    const filters = {}
    if (req.query.cuisine) filters.cuisine = req.filters.cuisine;
    else if (req.query.zipcode) filters.zipcode = req.filters.zipcode;
    else if (req.query.name) filters.zipcode = req.filters.name;

    const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({ filters, page, restaurantsPerPage });

    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      enteries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants
    }

    res.json(response);
  }
}