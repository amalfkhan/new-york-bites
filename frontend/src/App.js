import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/AddReview";
import Restaurant from "./components/Restaurant";
import RestaurantsList from "./components/RestaurantsList";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);

  const logout = () => {

  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/restaurants">Restaurant Reviews</a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            { user 
              ? ( <a onClick={logout} className="nav-link">Logout {user.name}</a> )
              : ( 
                  <>
                    <Link to={"/login"} className="nav-link">Login</Link> 
                    <Link to={"/register"} className="nav-link">Register</Link> 
                  </>
                )
            }
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user}/>
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user}/>
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} />
            )}
          />
          <Route 
            path="/register"
            render={(props) => (
              <Register {...props} />
            )}
          />
        </Switch>
      </div>

    </div>
  );
}

export default App;
