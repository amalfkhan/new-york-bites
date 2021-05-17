import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantDataService from "../services/restaurant";

const AddReview = (props) => {
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  let editing = false;

  if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text;
  }

  const handleInputChange = (e) => {
    setReview(e.target.value);
  }

  const saveReview = () => {
    
  }

  return (
    <div>
      AddReview
    </div>
  );
}

export default AddReview;