// src/components/shared/CustomizedInput.jsx

import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomizedInput = ({ name, type, label }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // sm = 600px

  return (
    <TextField
      fullWidth
      margin="normal"
      variant="filled"
      name={name}
      label={label}
      type={type}
      InputLabelProps={{
        style: {
          color: "black",
          background: "transparent",
          fontSize: isSmallScreen ? 16 : 20,
        },
      }}
      InputProps={{
        disableUnderline: true,
        style: {
          borderRadius: 10,
          color: "black",
          background: "#fff",
        },
      }}
      sx={{
        "& .MuiFilledInput-root": {
          "&:hover": {
            background: "#f5f5f5",
          },
          "&.Mui-focused": {
            background: "#fff",
          },
          fontSize: isSmallScreen ? "0.7rem" : "1.25rem", // Responsive font size
          padding: isSmallScreen ? "0.3rem" : "0.75rem", // Responsive padding
        },
        "& .MuiInputLabel-root": {
          fontSize: isSmallScreen ? "0.1rem" : "1.25rem",
        },
      }}
    />
  );
};

export default CustomizedInput;
