// component to display 404 page

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Grid, Typography, Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: "40px 40px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 350
  },
  button: {
    margin: "50px 20px 20px 20px",
    padding: "10px 20px",
    display: 'inline-block'
  }
}));

const FourZeroFour = () => {
  const classes = useStyles()

  return (
    <Grid container direction="column" alignItems="center" >
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        That page doesn't exist
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
    </div> 
  </Grid>
  );
}

export default FourZeroFour;