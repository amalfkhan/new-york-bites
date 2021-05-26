import React from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, Typography, Card, CardContent, CardActions, CardHeader, Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Masonry from 'react-masonry-css';
import ReviewDataServices from "../../services/review.service";
import colors from "./colors";

const useStyles = makeStyles({
  reviewCard: {
    padding: "5px 20px"
  }
});

const ReviewCards = ({ restaurantId, restaurant, setRestaurant, loggedIn }) => {
  const classes = useStyles();
  const history = useHistory();
  const breakpoints = {
    default: 4,
    1500: 3,
    1100: 2,
    850: 1
  };

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
                  <IconButton onClick={() => deleteReview(review._id, index)}>
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
}

export default ReviewCards