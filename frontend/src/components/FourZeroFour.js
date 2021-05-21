import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";
import ReviewDataServices from "../services/review";

const Restaurant = (props) => {
  return (
    <div>
      Hmmm this page dosen't exist
      <Link to={"/"} className="btn btn-primary">Go Home</Link>
    </div>
  );
}

export default Restaurant;