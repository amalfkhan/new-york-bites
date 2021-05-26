import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, Container, Grid, Divider, Typography, Button } from '@material-ui/core';
import RestaurantDataService from "../../services/restaurant.service";
import AuthContext from "../../context/AuthContext";
import ReviewCards from "./ReviewCards";

const useStyles = makeStyles({
  header: {
    paddingTop: '5%',
    paddingBottom: '2%'
  },
  reviewsContainer: {
    "&.MuiGrid-container": {
      display: "block"
    },
    paddingTop: '7%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },
  cuisine: {
    fontSize: 16
  },
  button: {
    margin: 20,
    padding: "10px 20px",
    display: 'inline-block'
  }
});

const Restaurant = (props) => {
  const [restaurantId, setRestaurantId] = useState(props.match.params.id);
  const [restaurant, setRestaurant] = useState("");
  const { loggedIn } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles(restaurant);
  
  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then(res => {
        setRestaurant(res.data);
        setRestaurantId(res.data._id);
      })
      .catch(e => {
        console.error(`unable to retrieve restaurant in RestaurantPage: ${e}`);
        history.push("/404");
      });
  }

  const getRandomRestaurant = () => {
    RestaurantDataService.getRandom()
      .then(res => {
        setRestaurant(res.data);
        setRestaurantId(res.data._id);
      })
      .catch(e => {
        console.error(`unable to retrieve random restaurant in RestaurantPage: ${e}`);
        history.push("/404");
      });
  }

  useEffect(() => {
    if(props.match.params.id === "lucky") getRandomRestaurant();
    else {getRestaurant(props.match.params.id)};
  }, [props.match.params.id]);

  return (
    <Container>
        {restaurant 
        ? (
          <div>
            <Grid container align = "center" alignItems="center" justify="center" spacing={1} className={classes.header}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" className={classes.cuisine} color="textSecondary">
                  {restaurant.cuisine}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h3" component="h2">
                  {restaurant.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.address} color="textSecondary" gutterBottom>
                  {`${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" component="p">
                  {`Grade: ${restaurant.grades[0]?.grade}`}<span className={classes.bullet}>•</span>{`Score: ${restaurant.grades[0]?.score}`}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" className={classes.button} target="_blank" href={"https://www.google.com/maps/place/" + `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`}>
                  View map
                </Button>
                <Button 
                  variant="contained"
                  color="primary"
                  className={classes.button} 
                  component={Link} 
                  to= { loggedIn?.status ? { pathname: "/restaurants/" + restaurantId + "/review", state: { currentReview: "" } } : { pathname: "/login" } }
                >
                  Add a review
                </Button>
              </Grid>
            </Grid>

            <Divider variant="middle" />   

            <Grid className={classes.reviewsContainer} container spacing={3} justify="center">
              {restaurant.reviews.length > 0 
              ? (
                <ReviewCards restaurantId={restaurantId} restaurant={restaurant} setRestaurant={setRestaurant} loggedIn={loggedIn} />
              ) 
              : (
                <Grid container align="center" alignItems="center" justify="center" spacing={1} >
                  <Typography variant="h6" className={classes.address} color="textSecondary" gutterBottom>
                    No reviews yet<br/>
                    Have you visited this restuarant? Add a review above!
                  </Typography>
                </Grid>
              )}
            </Grid>

          </div>
        ) 
        : (<></>)}
    </Container>
  );
}

export default Restaurant;