import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { indigo, amber } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import ReviewActions from "./components/Restaurant/ReviewActions";
import Restaurant from "./components/Restaurant/RestaurantPage";
import RestaurantsPage from "./components/RestaurantsList/RestaurantsPage";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import FourZeroFour from "./components/FourZeroFour";

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
  },
});

function Router() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route
              exact
              path={["/", "/restaurants"]}
              component={RestaurantsPage}
            />
            <Route
              path="/restaurants/:id/review"
              render={(props) => <ReviewActions {...props} />}
            />
            <Route
              exact
              path="/restaurants/:id"
              render={(props) => <Restaurant {...props} />}
            />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/404" render={() => <FourZeroFour />} />
            <Route path="" render={() => <FourZeroFour />} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Router;
