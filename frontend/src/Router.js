import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/AddReview";
import Restaurant from "./components/Restaurant";
import RestaurantsList from "./components/RestaurantsList";
import Login from "./components/Login";
import Register from "./components/Register";
import FourZeroFour from "./components/FourZeroFour"
import LogOutButton from "./components/LogOutButton";
import AuthContext from "./context/AuthContext";

function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/restaurants">Restaurant Reviews</a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/restaurants"} className="nav-link">Restaurants</Link>
            </li>
            { loggedIn?.status === true && <li style={{color: "white"}}>{loggedIn.userData.username}</li> }
            <li className="nav-item">
              { loggedIn?.status === true && <LogOutButton /> }
              { loggedIn?.status === false && <>
              <Link to={"/login"} className="nav-link">Login</Link> 
              <Link to={"/register"} className="nav-link">Register</Link> </>
              }
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route 
              exact 
              path={["/", "/restaurants"]} 
              component={RestaurantsList} 
            />
            <Route 
              path="/restaurants/:id/review"
              render={(props) => (
                <AddReview {...props} />
              )}
            />
            <Route
              exact
              path="/restaurants/:id"
              render={(props) => (
                <Restaurant {...props} />
              )}
            />
            <Route 
              exact
              path="/login"
              render={() => (
                <Login />
              )}
            />
            <Route 
              exact
              path="/register"
              render={() => (
                <Register />
              )}
            />
            <Route
              exact 
              path="/404"
              render={() => (
                <FourZeroFour />
              )}
            />
            <Route 
              path=""
              render={() => (
                <FourZeroFour />
              )} 
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Router;
