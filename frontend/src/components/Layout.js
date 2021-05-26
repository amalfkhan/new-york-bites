// component to render side bar and top bar
// side bar handles access to retaurant search and some preset restaurant options
// top bar handles routing for user login, registration and logout

import React, { useContext } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import LogoutButton from "./User/LogoutButton";
import { makeStyles, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Button, Avatar } from "@material-ui/core"
import { indigo } from '@material-ui/core/colors';
import CasinoIcon from '@material-ui/icons/Casino';
import SearchIcon from '@material-ui/icons/Search';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';

const drawerWidth = 240;
const drawerItems = [
  {
    text: "Search",
    icon: <SearchIcon color="secondary" />,
    path: "/"
  },
  {
    text: "Featured Quick Bite",
    icon: <EmojiFoodBeverageIcon color="secondary" />,
    path: "/restaurants/5eb3d669b31de5d588f4832e"
  },
  {
    text: "Featured Restaurant",
    icon: <RestaurantIcon color="secondary" />,
    path: "/restaurants/5eb3d668b31de5d588f42e34"
  },
  {
    text: "I'm Feeling Lucky",
    icon: <CasinoIcon color="secondary" />,
    path: "/restaurants/lucky"
  },
];

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    pageContainer: {
      background: "#f9f9f9",
      width: "100%",
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    active: {
      background: "#f4f4f4",
      "&.MuiListItem-root.Mui-disabled": {
        opacity: 1
      }
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      backgroundColor: "white",
      width: `calc(100% - ${drawerWidth}px)`,
      borderBottom: "1px solid #dbdbdb"
    },
    toolbar: theme.mixins.toolbar,
    username: {
      flexGrow: 1,
      margin: 20,
      fontSize: 16
    },
    button: {
      padding: 10,
      margin: 10
    },
    avatar: {
      backgroundColor: indigo[500]
    }
  }
});

const Layout = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar >
          {loggedIn?.status ?
            <>
              <Avatar className={classes.avatar}>{ loggedIn.userData.username.charAt(0).toUpperCase() }</Avatar>
              <Typography className={classes.username} component="p" variant="button" color="primary">{ loggedIn.userData.username }</Typography>
              <LogoutButton />
            </>
            : 
            <>
              <Typography className={classes.username} color="primary"></Typography>
              <Button
                className={classes.button} 
                color="primary"
                component={Link} 
                to={"/login"}
              >
                Login
              </Button>
              <Button 
                className={classes.button}
                color="primary"
                component={Link}
                to={"/register"}
              >
                Register
              </Button>
            </>
          }
          
        </Toolbar>
      </AppBar>

      <Drawer 
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography className={classes.title} variant="h5">New York Bites</Typography>
        </div>

        <List>
          {drawerItems.map((item, index) => (
            <ListItem 
              button
              disabled={location.pathname === item.path ? true : false}
              key={index}
              className={location.pathname === item.path ? classes.active : null}
              onClick={() => history.push(item.path)} // render component for restaurant or search page depending on selected sidebar option
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      
      <div className={classes.pageContainer}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  );
}

export default Layout;