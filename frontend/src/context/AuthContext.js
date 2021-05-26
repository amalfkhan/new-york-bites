// determine whether a user is logged in and access to the specific user data

import React, { createContext, useEffect, useState } from "react";
import UserDataService from "../services/user.service";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const userData = await UserDataService.loggedInUser();
    setLoggedIn(userData.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };