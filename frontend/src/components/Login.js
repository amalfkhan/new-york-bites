import React, {useEffect, useState} from "react";
import UserDataService from "../services/user";

const Login = (props) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  
  const login = () => {
    UserDataService.loginUser(user)
    .then(res => {
      if(res.data.userid) props.history.push("/");
    })
    .catch(e => {
      setError(e.response.data.error);
      console.error(`unable to login user in Login.js: ${e}`);
    });
  }

  return (
    <div>
      <div className="submit-form">
        <div>
          { error 
            ? <div>{error}</div>
            : ""
          }
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