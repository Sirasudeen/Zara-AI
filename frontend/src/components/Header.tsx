import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose(); // Close menu after navigation
  };

  const navLinks = auth?.isLoggedIn
  ? [
      <MenuItem key="chat" onClick={() => handleNavigation('/chat')}>Go To Chat</MenuItem>,
      <MenuItem key="logout" onClick={() => { auth.logout(); handleNavigation('/'); }}>Logout</MenuItem>,
    ]
  : [
      <MenuItem key="login" onClick={() => handleNavigation('/login')}>Login</MenuItem>,
      <MenuItem key="signup" onClick={() => handleNavigation('/signup')}>Signup</MenuItem>,
    ];


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
          zIndex: 1200, // Ensure AppBar has proper z-index
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
          {/* Navigation Links for large screens */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "15px" }}>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink bg="#FFF5CD" to="/chat" text="Go To Chat" textColor="black" />
                <NavigationLink
                  bg="#A66E38"
                  to="/"
                  text="Logout"
                  textColor="white"
                  onClick={auth.logout}
                />
              </>
            ) : (
              <>
                <NavigationLink bg="#FFF5CD" to="/login" text="Login" textColor="black" />
                <NavigationLink bg="#A66E38" to="/signup" text="Signup" textColor="white" />
              </>
            )}
          </Box>

          {/* Menu Icon for small screens */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none"}, mt:"1rem" }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu for small screens */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            background: "orange", // Background color of the dropdown
            width: '100px', // Adjust width of dropdown menu
          },
          
        }}

      >
        {navLinks}
      </Menu>
    </>
  );
};

export default Header;
