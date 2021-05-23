import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import RestaurantDataService from "../services/restaurant.service";
import ReviewDataServices from "../services/review.service";
import AuthContext from "../context/AuthContext";

const Restaurant = (props) => {
  const [restaurant, setRestaurant] = useState();
  const { loggedIn } = useContext(AuthContext);
  const history = useHistory();

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then(res => {
        setRestaurant(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.error(`unable to retrieve restaurant in Restaurant: ${e}`);
        history.push("/404");
      });
  }

  useEffect(() => {
    console.log("USE EFFECT")
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    ReviewDataServices.deleteReview(reviewId, loggedIn?.userData._id)
      .then(res => {
        var updateReviews = restaurant;
        updateReviews.reviews.splice(index, 1);
        setRestaurant( {...updateReviews})
      })
      .catch(e => {
        console.error(`unable to delete review in Restaurant: ${e}`);
        history.push("/login");
      })
  }

  return (
    <div>
      <div>
        {restaurant 
        ? (
          <div>
            <h5>{restaurant.name}</h5>
            <p>
              <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
              <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
            </p>
            <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
              Add Review
            </Link>
            <h4> Reviews </h4>
            <div className="row">
              {restaurant.reviews.length > 0 
              ? (
                restaurant.reviews.map((review, index) => {
                  return (
                    <div className="col-lg-4 pb-1" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <p className="card-text">
                            {review.text}<br/>
                            <strong>User: </strong>{review.name}<br/>
                            <strong>Date: </strong>{review.date.split("T")[0]}
                          </p>
                            {loggedIn?.status && loggedIn?.userData._id === review.user_id &&
                              <div className="row">
                                <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                                <Link 
                                  to={{
                                    pathname: "/restaurants/" + props.match.params.id + "/review",
                                    state: {
                                      currentReview: review
                                    }
                                  }} className="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                              </div>                   
                            }
                        </div>
                      </div>
                    </div>
                  );
                })
              ) 
              : (
                <div className="col-sm-4">
                  <p>No reviews yet.</p>
                </div>
              )}

            </div>

          </div>
        ) 
        : (<></>)}
      </div>
    </div>
  );
}

export default Restaurant;