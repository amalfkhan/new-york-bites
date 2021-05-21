import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewDataServices from "../services/review";
import RestaurantDataService from "../services/restaurant"
import restaurant from "../services/restaurant";

const AddReview = (props) => {
  let initialReviewState = "";
  let editing = false;
  var restuarant;

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]); //only call if this is updated

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.error(`unable to retrieve restaurant in Restaurant: ${e}`);
        props.history.push("/404");
      });
  }

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setReview(e.target.value);
  }

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: props.match.params.id
    }

    if (editing) {
      data.review_id = props.location.state.currentReview._id;
      ReviewDataServices.updateReview(data)
        .then(res => {
          setSubmitted(true);
        })
        .catch(e => {
          console.error(`unable to edit review in AddReview: ${e}`);
        });
    } else {
      ReviewDataServices.createReview(data)
        .then(res => {
          setSubmitted(true);
        })
        .catch(e => {
          console.error(`unable to save new review in AddReview: ${e}`);
        });  
    }
  }

  return (
    <div>
        {restaurant && props.user
        ? (<div>
            <div className="submit-form">
              {submitted ? (
                <div>
                  <h4>Thank you for your review!</h4>
                  <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
                    Back to Restaurant
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
                    <input
                      type="text"
                      className="form-control"
                      id="text"
                      required
                      value={review}
                      onChange={handleInputChange}
                      name="text"
                    />
                  </div>
                  <button onClick={saveReview} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>)
        : (<></>)}
    </div>
  );
}

export default AddReview;