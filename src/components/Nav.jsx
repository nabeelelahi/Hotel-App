import {
  AppBar,
  makeStyles,
  IconButton,
  withStyles,
  Grid,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebaseconfig";

const BootstrapButton = withStyles({
  root: {
    margin: "15px",
    boxShadow: "none",
    textTransform: "none",
    fontSize: "13px",
    padding: "8px 16px",
    lineHeight: 1.5,
    backgroundColor: "#1c1c15",
    color: "#ebebc0",
    fontFamily: "unset",
    "&:hover": {
      backgroundColor: "#1c1c15",
      color: "#c9c9a3",
      boxShadow: "none",
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: "#1c1c15",
    flexDirection: "row",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("User"));
    setUser(currentuser);
  }, []);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const logout = () => {
    auth.signOut().then(() => {
      localStorage.clear();
      setAnchorEl(null);
      navigate("/");
    });
  };

  return (
    <AppBar position="sticky" className={classes.nav}>
      <Grid container>
        <Grid item xs={9} lg={11} md={10} sm={10}>
 
            <h3 style={{marginLeft:'4%',color:'#ebebc0'}}>Hotel App</h3>
        </Grid>
        <Grid item xs={3} lg={1} md={2} sm={2}>
          {user ? (
            <div style={{ margin: "2%" }}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Previous Bookings</MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <BootstrapButton
              variant="contained"
              color="primary"
              disableRipple
              className={classes.margin}
            >
              <Link
                style={{ textDecoration: "none", color: "#ebebc0" }}
                to="/login"
              >
                Login
              </Link>
            </BootstrapButton>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Nav;
