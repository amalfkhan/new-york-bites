import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Grid, Card, Typography, CardContent, CardActions, Button } from '@material-ui/core';

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
});

const RestaurantCard = ({ restaurants }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid container spacing={4}>
      {restaurants.map((restaurant, index) => {
        const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
        const grade = `Grade: ${restaurant.grades[0]?.grade}`;
        const score = `Score: ${restaurant.grades[0]?.score}`;

        return (
          <Grid item xs={6} md={4} lg={3} key={index}>
            <Card variant="outlined">
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
          </Grid>
        );
      })}
    </Grid>
  );
}

export default RestaurantCard;