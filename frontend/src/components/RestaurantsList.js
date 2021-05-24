import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";
import RestaurantDataService from "../services/restaurant.service";
import Pagination from "./Pagination";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    width: "80%"
  },
  select: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    width: "80%"
  },
  helperText: {
    color: "red"
  },
  searchContainer: {
    marginBottom: 50,
    marginTop: 50
  }
});

const RestaurantsList = (props) => {
  const classes = useStyles();
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZipcode, setSearchZipcode] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("All Cuisines");
  const [searchError, setSearchError] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [currPage, setCurrPage] = useState(1);
  const [searching, setSearching] = useState("all");
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const restaurantsPerPage = 100;
  var newSearch = false;
  const errorText = "Search term required";

  useEffect(() => {
    window.scrollTo(0, 0);
    if(searching === "name") { findByName(); }
    else if(searching === "zipcode") { findByZipcode(); }
    else if(searching === "cuisine") { findByCuisine(); }
    else { 
      retrieveRestaurants();
      retrieveCuisines();
    }
  }, [currPage]);

  const retrieveRestaurants = () => {
    var page = currPage;
    if(newSearch) page = 1
    RestaurantDataService.getAll(page, restaurantsPerPage)
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
    var page = currPage;
    if(newSearch) page = 1;
    RestaurantDataService.find(query, by, page, restaurantsPerPage)
      .then(res => {
        setTotalRestaurants(res.data.total_restaurants);
        setRestaurants(res.data.restaurants);
      })
      .catch(e => {
        console.error(`unable to find in RestaurantsList: ${e}`);
      });
  }

  const findByName = () => {
    setSearchZipcode("");
    setSearchCuisine("All Cuisines");
    if (!searchName) { setSearchError("name") }
    else {
      setSearchError("");
      setSearching("name");
      find(searchName, "name");
    }
  }


  const findByZipcode = () => {
    setSearchName("");
    setSearchCuisine("All Cuisines");
    if (!searchZipcode) { setSearchError("zipcode") }
    else {
      setSearchError("");
      setSearching("zipcode");
      find(searchZipcode, "zipcode");
    }
  }

  const findByCuisine = () => {   
    setSearchName("");
    setSearchZipcode("");
    if (!searchCuisine) { setSearchError("cuisine") }
    else {
      setSearchError("");
      setSearching("cuisine");
      if(searchCuisine === "All Cuisines") {
        refreshList();
      } else {
        find(searchCuisine, "cuisine");
      }
    }
  }

  return (
    <Container>
      <Typography variant="h3" component="h1" color="textSecondary" align="center" gutterBottom>
        Find your spot
      </Typography>
      <Grid container spacing={3} className={classes.searchContainer}>
        <Grid item xs={12} md={4}>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.field}
              label="Search by restaurant"
              variant="outlined"
              value={searchName}
              onChange={(e) => { setSearchError(""); setSearchName(e.target.value) }}
              fullWidth
              helperText={searchError === "name" && errorText}
              FormHelperTextProps={{
                className: classes.helperText
              }}
            />
            <Button variant="contained" color="primary" onClick={ () => { newSearch = true; findByName() }}>
              Search
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md={4}>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.field}
              label="Search by zipcode"
              variant="outlined"
              value={searchZipcode}
              onChange={(e) => { setSearchError(""); setSearchZipcode(e.target.value) }}
              fullWidth
              helperText={searchError === "zipcode" && errorText}
              FormHelperTextProps={{
                className: classes.helperText
              }}
            />
            <Button variant="contained" color="primary" onClick={ () => { newSearch = true; findByZipcode() }}>
              Search
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md={4}>
          <form noValidate autoComplete="off">
            <Select
              className={classes.select}
              variant="outlined"
              value={searchCuisine}
              displayEmpty
              onChange={(e) => { setSearchError(""); setSearchCuisine(e.target.value) }}
              fullWidth
              helperText={searchError === "cuisine" && errorText}
              FormHelperTextProps={{
                className: classes.helperText
              }}
            >
              {cuisines.map((cuisine, index) => {
                return (
                  <MenuItem value={cuisine} key={index}>{cuisine}</MenuItem>
                )
              })}
            </Select>
            <Button variant="contained" color="primary" onClick={ () => { newSearch = true; findByCuisine() }}>
              Search
            </Button>
          </form>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {restaurants.map((restaurant, index) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <Grid item xs={6} sm={4} md={3} key={index}>
              {/* <div className="card">
                <div className="card-body"> */}
                <Paper>
                  <h5>{restaurant.name}</h5>
                  <p>
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                    <strong>Address: </strong>{address}
                  </p>
                  <div>
                    <Link to={"/restaurants/" + restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </Paper>  
                {/* </div>
              </div> */}
            </Grid>
          );
        })}
      </Grid>

      <Pagination totalRestaurants={totalRestaurants} restaurantsPerPage={restaurantsPerPage} setCurrPage={setCurrPage} currPage={currPage} newSearch={newSearch}/>
    </Container>
  );
}

export default RestaurantsList;