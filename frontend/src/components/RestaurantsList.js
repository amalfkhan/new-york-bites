import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant"

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZipcode, setSearchZipcode] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  });

  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  }

  const onChangeSearchZipcode = (e) => {
    setSearchZipcode(e.target.value);
  }

  const onChangeSearchCuisine = (e) => {
    setSearchCuisine(e.target.value);
  }

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants);
      })
      .catch(e => {
        console.error(`unable to retrieve restaurants in RestaurantsList: ${e}`);
      });
  }
  
  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(res => {
        console.log(res.data);
        setCuisines(["All Cuisines"].concat(res.data));
      })
      .catch(e => {
        console.error(`unable to retrieve cuisines in RestaurantsList: ${e}`);
      });
  }

  const refreshList = () => {
    retrieveRestaurants();
  }

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(res => {
        setRestaurants(res.data.restaurants);
      })
      .catch(e => {
        console.error(`unable to find in RestaurantsList: ${e}`);
      });
  }

  const findByName = () => {
    find(searchName, "name");
  }

  const findByZipcode = () => {
    find(searchZipcode, "zipcode");
  }

  const findByCuisine = (e) => {
    e.preventDefault();
    if(searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  }

  return (
    <div>
      <form onSubmit={findByCuisine}>
        <input type="text" value={searchCuisine} onChange={onChangeSearchCuisine} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default RestaurantsList;