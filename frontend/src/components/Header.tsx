// Header.jsx
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const auth = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = auth?.isLoggedIn ? (
    <>
      <NavigationLink
        bg="#FFF5CD"
        to="/chat"
        text="Go To Chat"
        textColor="black"
      />
      <NavigationLink
        bg="#A66E38"
        textColor="white"
        to="/"
        text="Logout"
        onClick={auth.logout}
      />
    </>
  ) : (
    <>
      <NavigationLink
        bg="#FFF5CD"
        to="/login"
        text="Login"
        textColor="black"
      />
      <NavigationLink
        bg="#A66E38"
        textColor="white"
        to="/signup"
        text="Signup"
      />
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          bgcolor: "transparent",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          boxShadow: "none",
          padding: { xs: "0.5rem 1rem", md: "1rem 2rem" },
          zIndex: 1300,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1.4rem",
          }}
        >
          <Logo />
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "15px" }}>
            {navLinks}
          </Box>
          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {React.Children.map(navLinks, (child) => (
              <ListItem button component={child.props.to ? "a" : "div"}>
                <ListItemText primary={child.props.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
