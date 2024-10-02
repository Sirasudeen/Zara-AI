import { Box } from "@mui/material";
import React from "react";

const NotFound = () => {
  return <Box
  sx={{
    display:'flex',
    alignItems: 'center',
    padding: '20px',
    marginTop: "10rem",
    marginLeft: "20rem",
    
    fontSize:'4rem',
    fontFamily: 'Courier-prime',
    color: 'grey'
  }}
  >Not Found! Check the URL!!!</Box>;
};

export default NotFound;
