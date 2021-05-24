import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { indigo, amber } from '@material-ui/core/colors';
import AddReview from "./components/Restaurant/Review";
import Restaurant from "./components/Restaurant/Page";
import RestaurantsList from "./components/RestaurantsList/Page";
import Login from "./components/Login";
import Register from "./components/Register";
import FourZeroFour from "./components/FourZeroFour"
import LogOutButton from "./components/LogOutButton";
import AuthContext from "./context/AuthContext";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,

  }
})

function Router() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <div>
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
        </nav> */}

        <div>
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
    </ThemeProvider>
  );
}

export default Router;
