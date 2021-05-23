import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserDataService from "../services/user.service.js";

function LogOutButton() {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function logOut() {
    UserDataService.logoutUser()
    await getLoggedIn();
    window.location.reload();
  }

  return <button onClick={logOut}>Log out</button>;
}

export default LogOutButton;