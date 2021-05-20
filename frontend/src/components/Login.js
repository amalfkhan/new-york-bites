import React, {useEffect, useState} from "react";
import UserDataService from "../services/user";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  
  const login = () => {
    // UserDataService.loginUser(user)
    // .then(res => {
    //   if(res.data.auth) localStorage.setItem("token", res.data.token);
    //   props.history.push("/");
    // })
    // .catch(e => {
    //   console.error(`unable to login user in Login.js: ${e}`);
    // });
    UserDataService.cookiePath()
    .then(res => {

    })
  }

  return (
    <div>
      <div className="submit-form">
        <div>
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