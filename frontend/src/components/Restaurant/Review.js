import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ReviewDataServices from "../../services/review.service";
import RestaurantDataService from "../../services/restaurant.service"
import restaurant from "../../services/restaurant.service";

const AddReview = (props) => {
  let initialReviewState = "";
  let editing = false;
  const history = useHistory();
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .catch(e => {
        console.error(`unable to retrieve restaurant in Restaurant: ${e}`);
        history.push("/404");
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
      name: loggedIn.userData.username,
      user_id: loggedIn.userData._id,
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
          props.history.push("/login");
        });
    } else {
      ReviewDataServices.createReview(data)
        .then(res => {
          setSubmitted(true);
        })
        .catch(e => {
          console.error(`unable to save new review in AddReview: ${e}`);
          props.history.push("/login");
        });  
    }
  }

  return (
    <div>
        {restaurant && loggedIn.userData
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