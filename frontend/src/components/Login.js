import React, { useContext, useState } from "react";
import UserDataService from "../services/user.service";

import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const login = async () => {
    try {
      await UserDataService.loginUser(user);
      await getLoggedIn();
      history.push("/");
    } catch (e) {
      if (e.response) setError(e.response.data.error); // => the response payload 
    }
  }

  return (
    <div>
      <div className="submit-form">
        <div>
          <div>{error}</div>
          <div className="form-group">
            <label htmlFor="user">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="id">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              required
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <button onClick={login} className="btn btn-primary">
            Login
          </button>
        </div>
      </div> 
    </div>
  );
}

export default Login;