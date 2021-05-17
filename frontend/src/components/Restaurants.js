import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant"

const Restaurant = (props) => {
  const [restaurant, setRestaurant] = useState({
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  });
  
  console.log(restaurant);

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]); //only call if this is updated

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then(res => {
        console.log(res.data);
        setRestaurant(res.data);
      })
      .catch(e => {
        console.error(`unable to retrieve restaurant in Restaurants: ${e}`);
      });
  }

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId)
      .then((res) => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1);
          return ({ ...prevState });
        });
      })
      .catch(e => {
        console.error(`unable to delete review in Restaurants: ${e}`);
      })
  }

  return (
    <div>
    </div>
  );
}

export default Restaurant;