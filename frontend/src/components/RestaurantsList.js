import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant"

const RestaurantsList = (props) => {
  return (
    <div>
      RestaurantDataService.getCuisines();
    </div>
  );
}

export default RestaurantsList;