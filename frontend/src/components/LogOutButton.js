import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserDataService from "../services/user.service.js";
import { Button, makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => {
  return {
    button: {
      padding: 10
    }
  }
});

function LogoutButton() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  async function logOut() {
    UserDataService.logoutUser()
    await getLoggedIn();
    window.location.reload();
  }

  return <Button className={classes.button} color="primary" onClick={logOut}> Logout</Button>
}

export default LogoutButton;