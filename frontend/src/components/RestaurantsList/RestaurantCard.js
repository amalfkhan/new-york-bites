import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Card, Typography, CardContent, CardActions, Button } from '@material-ui/core';
import Masonry from 'react-masonry-css';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 10px',
    transform: 'scale(0.8)',
  },
  cuisine: {
    fontSize: 14,
  },
  address: {
    marginBottom: 10,
  },
  restaurantCard: {
    padding: "15px"
  }
});

const RestaurantCard = ({ restaurants }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const breakpoints = {
    default: 4,
    1500: 3,
    1100: 2,
    850: 1
  };

  return (
    <Masonry
    breakpointCols={breakpoints}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
      {restaurants.map((restaurant, index) => {
        const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
        const grade = `Grade: ${restaurant.grades[0]?.grade}`;
        const score = `Score: ${restaurant.grades[0]?.score}`;

        return (
          <div key={index}>
            <Card className={classes.restaurantCard} variant="outlined">
              <CardContent>
                <Typography className={classes.cuisine} color="textSecondary" gutterBottom>
                  {restaurant.cuisine}
                </Typography>
                <Typography variant="h5" component="h2">
                  {restaurant.name}
                </Typography>
                <Typography className={classes.address} color="textSecondary">
                  {address}
                </Typography>
                <Typography variant="body2" component="p">
                  {grade}{bull}{score}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">                    
                  <Link to={"/restaurants/" + restaurant._id} style={{ textDecoration: 'none', color: "inherit" }}>
                    View Reviews
                  </Link>
                </Button>
                <Button size="small" target="_blank" href={"https://www.google.com/maps/place/" + address}>
                  View map
                </Button>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </Masonry>
  );
}

export default RestaurantCard;