import React, {useState} from "react";

const Login = (props) => {
  const [user, setUser] = useState({
    name: "",
    id: ""
  });

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  
  const login = () => {
    props.login(user);
    props.history.push("/");
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
              id="name"
              required
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              className="form-control"
              id="id"
              required
              value={user.id}
              onChange={handleInputChange}
              name="id"
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