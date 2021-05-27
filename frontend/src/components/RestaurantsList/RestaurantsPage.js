// component to display the landing search page

import React, { useState } from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import RestaurantCards from "./RestaurantCards";
import Pagination from "./Pagination";
import Search from "./Search";

const useStyles = makeStyles({
  pageContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    paddingTop: "5%",
    paddingBottom: "2%",
  },
});

const RestaurantsPage = (props) => {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const restaurantsPerPage = 99;
  var newSearch = false;

  return (
    <Container className={classes.pageContent}>
      <Typography
        className={classes.header}
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
      >
        What are you craving?
      </Typography>
      <Search
        setRestaurants={setRestaurants}
        setTotalRestaurants={setTotalRestaurants}
        currPage={currPage}
        restaurantsPerPage={restaurantsPerPage}
        newSearch={newSearch}
      />
      <RestaurantCards restaurants={restaurants} />
      <Pagination
        totalRestaurants={totalRestaurants}
        restaurantsPerPage={restaurantsPerPage}
        setCurrPage={setCurrPage}
        currPage={currPage}
        newSearch={newSearch}
      />
    </Container>
  );
};

export default RestaurantsPage;
