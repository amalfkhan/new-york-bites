import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles, TextField, Grid, Typography, Paper, Button } from '@material-ui/core';
import AuthContext from "../../context/AuthContext";
import ReviewDataServices from "../../services/review.service";
import RestaurantDataService from "../../services/restaurant.service"
import restaurant from "../../services/restaurant.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: "40px 40px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 350
  },
  form: {
    width: '100%',
    margin: theme.spacing(3),
  },
  helperText: {
    color: "red"
  },
  button: {
    margin: "50px 20px 20px 20px",
    padding: "10px 20px",
    display: 'inline-block'
  }
}));

const ReviewActions = (props) => {
  let initialReviewState = "";
  let editing = false;
  const history = useHistory();
  const { loggedIn } = useContext(AuthContext);
  const classes = useStyles();

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
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setReview(e.target.value);
  }

  const saveReview = () => {
    if (review === '') {
      setError(true)
    } else {    
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
            console.error(`unable to edit review in ReviewActions: ${e}`);
            props.history.push("/login");
          });
      } else {
        ReviewDataServices.createReview(data)
          .then(res => {
            setSubmitted(true);
          })
          .catch(e => {
            console.error(`unable to save new review in ReviewActions: ${e}`);
            props.history.push("/login");
          });  
      }
    }
  }

  const restaurantUrl = `/restaurants/${props.match.params.id}`

  return (
    <div>
      {restaurant ? (
        (submitted ? (
          <Grid container direction="column" alignItems="center" >
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Thank you for your review!
            </Typography>
              <Button 
                variant="contained"
                color="primary"
                className={classes.button} 
                component={Link} 
                to={restaurantUrl}
              >
                Back to Restaurant
              </Button>
          </Paper> 
        </Grid>

        ) : (
          <Grid container direction="column" alignItems="center" >
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                { editing ? "Edit Review" : "Add Review" }
              </Typography>
                
              <form className={classes.form} noValidate>
                <Grid container spacing={3} align="center" >
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      id="text"
                      label="Review"
                      name="text"
                      value={review}
                      onChange={ (e) => { setError(false); handleInputChange(e)} }
                      autoFocus
                      helperText={error && "Required"}
                      FormHelperTextProps={{
                        className: classes.helperText
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={saveReview}>
                      Submit
                    </Button>
                  </Grid>
                  </Grid>
              </form>
            </Paper> 
          </Grid>
        ))
      ) : (
        <Grid container direction="column" alignItems="center" >
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sorry - something has gone wrong
            </Typography>
              <Button 
                variant="contained"
                color="primary"
                className={classes.button} 
                component={Link} 
                to= {{ pathname: "/" }}
              >
                Go Home
              </Button>
          </Paper> 
        </Grid>
      )}
       {/* </div>      {submitted ? (
              <div>
                <h4>Thank you for your review!</h4>
                <Link to={"/restaurants/" + props.match.params.id} className="btn btn-success">
                  Back to Restaurant
                </Link>
              </div>
            ) : ( 





      <div>
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
        </div>
      )
      : (<></>)}*/}
    </div> 
  );
}

export default ReviewActions;