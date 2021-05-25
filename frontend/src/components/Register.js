import React, { useState, useContext } from "react";
import { makeStyles, TextField, Grid, Typography, Avatar, Paper, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UserDataService from "../services/user.service";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: "40px 40px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 350
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(3),
  },
  helperText: {
    color: "red"
  },
}));

const Register = () => {
  const classes = useStyles();
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const [errorText, setErrorText] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    verifyPassword: ""
  });
  
  const handleError = (error) => {
    if (error.includes("email")) {
      setError("email");
      error.includes("empty") ? setErrorText("Required") : ( error.includes("valid") ? setErrorText("Invalid email") : setErrorText("Email associated with an existing account") );
    } else if (error.includes("username")) {
      setError("username");
      (error.includes("empty") || error.includes("8")) ? setErrorText("Minimum 8 characters") : setErrorText("Username associated with an existing account");
    } else if (error.includes("password")) {
      setError("password");
      (error.includes("empty") || error.includes("8")) ? setErrorText("Minimum 8 characters") : setErrorText("Error: please enter a differnt password");
    } else if (error.includes("verifyPassword")) {
      console.log(error);
      setError("verifyPassword");
      (error.includes("empty") || error.includes("8") || error.includes("failed")) ? setErrorText("Passwords must match") : setErrorText("Error: please enter a differnt password");
    }
  }

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  
  const register = async () => {
    try {
      await UserDataService.registerUser(user);
      await getLoggedIn();
      history.push("/");
    } catch (e) {
      if (e.response) handleError(e.response.data.error);
    }
  }

  return (
    <Grid container direction="column" alignItems="center" >
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={3} align="center" >
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={user.email}
                onChange={ (e) => { setError(""); handleInputChange(e)} }
                autoFocus
                helperText={error === "email" && errorText}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={user.username}
                onChange={ (e) => { setError(""); handleInputChange(e)} }
                helperText={error === "username" && errorText}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={user.password}
                type="password"
                onChange={ (e) => { setError(""); handleInputChange(e)} }
                helperText={error === "password" && errorText}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="verifyPassword"
                label="Verify Password"
                name="verifyPassword"
                value={user.verifyPassword}
                type="password"
                onChange={ (e) => { setError(""); handleInputChange(e)} }
                helperText={error === "verifyPassword" && errorText}
                FormHelperTextProps={{
                  className: classes.helperText
                }}
              />
            </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="contained" onClick={register}>
                  Register
                </Button>
              </Grid>
            </Grid>
        </form>
      </Paper> 
    </Grid>
  );
}

export default Register;