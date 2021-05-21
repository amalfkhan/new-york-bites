import React, {useEffect, useState} from "react";
import UserDataService from "../services/user";

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  
  const register = () => {
    UserDataService.registerUser(user)
    .then(res => {
      props.history.push("/");
    })
    .catch(e => {
      console.error(`unable to register user in Register.js: ${e}`);
    });
  }

  return (
    <div>
      <div className="submit-form">
        <div>
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

          <button onClick={register} className="btn btn-primary">
            Register
          </button>
        </div>
      </div> 
    </div>
  );
}

export default Register;