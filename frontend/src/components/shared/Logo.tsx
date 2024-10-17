import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
        marginTop:"2rem"
      }}
    >
      <Link to={"/"} > 
        <img
          src="openai.svg"
          alt="openai"
          width={"90px"}
          height={"90px"}
        />
      </Link>{" "}
      <Link to={"/"} style={{ textDecoration: 'none' }} >
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          fontFamily: "sans-serif",
          color: "#E78F81",
          fontSize: "2rem",
          textShadow: "2px",
        }}
      >
        <span style={{ fontSize: "4rem", fontFamily:'Satisfy' }}>Zara</span>  -AI
      </Typography>
      </Link>{" "}

    </div>
  );
};

export default Logo;
