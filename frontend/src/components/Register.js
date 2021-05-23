import React, { useState, useContext } from "react";
import UserDataService from "../services/user.service";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Register = (props) => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    verifyPassword: ""
  });
  
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  
  const register = async () => {
    try {
      await UserDataService.registerUser(user);
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
            <label htmlFor="user">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="id">Verify Password</label>
            <input
              type="text"
              className="form-control"
              id="verifyPassword"
              required
              value={user.verifyPassword}
              onChange={handleInputChange}
              name="verifyPassword"
            />
          </div>

          <button onClick={register} className="btn btn-primary">
            Register
          </button>
        </div>
      </div> 
    </div>
  );
}

export default Register;