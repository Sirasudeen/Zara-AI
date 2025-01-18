import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useWindowScroll } from "react-use";
import Magnet from '../blocks/Animations/Magnet/Magnet'
import gsap from "gsap";

const Header = () => {

  const {y:currentScrollY} = useWindowScroll();
  
  const [lastScrollY,setLastScrollY] = useState(0);
  const [HeaderbgVis,setHeaderbgVis] = useState(false);
  useEffect(() => {
      if(currentScrollY === 0){
          setHeaderbgVis(true);

      }
      else if(currentScrollY > lastScrollY)
      {
         setHeaderbgVis(false);
      }


      setLastScrollY(currentScrollY);
  },[currentScrollY])

  useEffect(() => {
    gsap.to(".Headerbar", {
      y: HeaderbgVis ? 0 : -100,
      opacity: HeaderbgVis ? 1 : 0,
      duration: 0.2,
    });
  }, [HeaderbgVis]);

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
    handleMenuClose(); 
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
      className="Headerbar"
        sx={{
          bgcolor: 'transparent',
          position: "fixed",
          top: 20,
          borderRadius: 14,
          height: 'fit-content',
          boxShadow: "none",
          zIndex: 1200, 
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
                <Magnet disabled={false} magnetStrength={50}>
              
                <NavigationLink bg="#FFF5CD" to="/login" text="Login" textColor="black" />
                </Magnet>
                <Magnet disabled={false} magnetStrength={50}>

                <NavigationLink bg="#A66E38" to="/signup" text="Signup" textColor="white" />
                </Magnet>

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
