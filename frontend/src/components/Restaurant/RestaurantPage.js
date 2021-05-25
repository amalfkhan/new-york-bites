import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, Container, Grid, Divider, Typography, Button, Card, CardContent, CardActions, CardHeader, Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Masonry from 'react-masonry-css';
import RestaurantDataService from "../../services/restaurant.service";
import ReviewDataServices from "../../services/review.service";
import AuthContext from "../../context/AuthContext";
import colors from "./colors";

const useStyles = makeStyles({
  reviewCard: {
    padding: "5px 20px"
  }, 
  avatar: {
    backgroundColor: colors[Math.floor(Math.random() * colors.length)]
  },
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
  const breakpoints = {
    default: 4,
    1500: 3,
    1100: 2,
    850: 1
  };
  
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
    if(restaurantId === "lucky") getRandomRestaurant();
    else getRestaurant(restaurantId);
  }, [restaurantId]);

  const deleteReview = (reviewId, index) => {
    ReviewDataServices.deleteReview(reviewId, loggedIn?.userData._id)
      .then(res => {
        var updateReviews = restaurant;
        updateReviews.reviews.splice(index, 1);
        setRestaurant( {...updateReviews})
      })
      .catch(e => {
        console.error(`unable to delete review in RestaurantPage: ${e}`);
        history.push("/login");
      })
  }

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
                <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                  {restaurant.reviews.map((review, index) => {
                    return (
                      <div>
                        <Card className={classes.reviewCard}>
                          <CardHeader
                            avatar={
                              <Avatar style={{ backgroundColor:`${colors[Math.floor(Math.random() * colors.length)]}` }}>
                                {review.name.charAt(0).toUpperCase()}
                              </Avatar>
                            }
                            title={review.name}
                            subheader={review.date.split("T")[0]}
                          />

                          <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {review.text}
                            </Typography>
                          </CardContent>

                          {loggedIn?.status && loggedIn?.userData._id === review.user_id &&
                            <CardActions disableSpacing>
                              <IconButton 
                                onClick={() => deleteReview(review._id, index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton 
                                component={Link} 
                                to={{ pathname: "/restaurants/" + restaurantId + "/review", state: { currentReview: review } }}
                              >
                                <EditIcon />
                              </IconButton>
                            </CardActions>
                          }
                        </Card>
                      </div>
                    );
                  })}
                </Masonry>
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