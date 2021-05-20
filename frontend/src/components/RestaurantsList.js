import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant";
import Pagination from "./Pagination";

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZipcode, setSearchZipcode] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [currPage, setCurrPage] = useState(1);
  const [searching, setSearching] = useState("");
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const restaurantsPerPage = 100;

  useEffect(() => {
    // if(searching === "name") { findByName(); }
    // else if(searching === "zipcode") { findByZipcode(); }
    // else if(searching === "cuisine") { findByCuisine(); }
    // else { 
      retrieveRestaurants();
      retrieveCuisines();
    // }
  // }, [currPage]);
}, []);

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
    RestaurantDataService.getAll(currPage, restaurantsPerPage)
      .then(res => {
        setTotalRestaurants(res.data.total_restaurants);
        setRestaurants(res.data.restaurants);
      })
      .catch(e => {
        console.error(`unable to retrieve restaurants in RestaurantsList: ${e}`);
      });
  }
  
  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(res => {
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
    RestaurantDataService.find(query, by, currPage, restaurantsPerPage)
      .then(res => {
        // console.log(`SEARCHING: ${searching} CURRPAGE: ${currPage}`)
        setTotalRestaurants(res.data.total_restaurants);
        setRestaurants(res.data.restaurants);
      })
      .catch(e => {
        console.error(`unable to find in RestaurantsList: ${e}`);
      });
  }

  const findByName = () => {
    // setSearching("name");
    find(searchName, "name");
  }

  const findByZipcode = () => {
    // setSearching("zipcode");
    find(searchZipcode, "zipcode");
  }

  const findByCuisine = () => {
    // setSearching("cuisine");
    if(searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  }

  const submitCuisineSearch = () => {
    // setCurrPage(1);
    // console.log("does this ever happen?");
    findByCuisine();
  }

  const submitZipcodeSearch = () => {
    // setCurrPage(1);
    findByZipcode();
  }

  const submitNameSearch = () => {
    // setCurrPage(1);
    findByName();
  }

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={submitNameSearch}
            >
              Search
            </button>
          </div>
        </div>
        
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zipcode"
            value={searchZipcode}
            onChange={onChangeSearchZipcode}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={submitZipcodeSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
             {cuisines.map(cuisine => {
               return (
                 <option value={cuisine}> {cuisine} </option>
               )
             })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={submitCuisineSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* <Pagination totalRestaurants={totalRestaurants} restaurantsPerPage={restaurantsPerPage} setCurrPage={setCurrPage} currPage={currPage}/> */}

      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                  <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <Pagination totalRestaurants={totalRestaurants} restaurantsPerPage={restaurantsPerPage} setCurrPage={setCurrPage} currPage={currPage}/> */}
    </div>
  );
}

export default RestaurantsList;