import React, { useState } from "react";
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import RestaurantCards from "./Cards";
import Pagination from "./Pagination";
import Search from "./Search"

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    width: "80%"
  },
  select: {
    marginTop: 20,
    marginBottom: 20,
    width: "80%"
  },
  helperText: {
    color: "red"
  },
  searchContainer: {
    marginBottom: 50,
    marginTop: 50,
    justifyContent: "center"
  }
});

const RestaurantsList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const restaurantsPerPage = 100;
  var newSearch = false;

  return (
    <Container>
      <Typography variant="h3" component="h1" color="textSecondary" align="center" gutterBottom>
        Find your spot
      </Typography>
      <Search setRestaurants={setRestaurants} setTotalRestaurants={setTotalRestaurants} currPage={currPage} restaurantsPerPage={restaurantsPerPage} newSearch={newSearch}/>
      <RestaurantCards restaurants={restaurants} />
      <Pagination totalRestaurants={totalRestaurants} restaurantsPerPage={restaurantsPerPage} setCurrPage={setCurrPage} currPage={currPage} newSearch={newSearch}/>
    </Container>
  );
}

export default RestaurantsList;