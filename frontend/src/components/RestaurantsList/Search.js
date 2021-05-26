// component to display search bar on main search page

import React, {  useState, useEffect } from "react";
import { makeStyles, Button, TextField, Select, MenuItem, Grid } from '@material-ui/core';
import RestaurantDataService from "../../services/restaurant.service";

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

const Search = ({ setRestaurants, setTotalRestaurants, currPage, restaurantsPerPage, newSearch }) => {
  const classes = useStyles();
  const [searchName, setSearchName] = useState("");
  const [searchZipcode, setSearchZipcode] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("All Cuisines");
  const [searchError, setSearchError] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [searching, setSearching] = useState("all");
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

  // return - all restaurants based on current page selected in pagination (no query applied)
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
  
  // return - list of cuisines for search dropdown selector
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

  // return - restaurants based on query and current page selected in pagination
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
    <Grid container align = "center" alignItems="center" justify="center" spacing={3} className={classes.searchContainer}>
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
          <br/>
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
          <br/>
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
                <MenuItem value={cuisine} key={index}>{cuisine.substring(0, 20)}</MenuItem>
              )
            })}
          </Select>
          <br/>
          <Button variant="contained" color="primary" onClick={ () => { newSearch = true; findByCuisine() }}>
            Search
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default Search;