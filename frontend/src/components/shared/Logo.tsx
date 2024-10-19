  // Logo.jsx
  import { Link } from "react-router-dom";
  import Typography from "@mui/material/Typography";
  import { Box } from "@mui/material";
  import { keyframes } from "@mui/system";

  const rotate = keyframes`
        0% {
        transform: rotate(-40deg);
        }
        50%
        {
        transform: rotate(0deg);
        }
        100%
        {
        transform: rotate(40deg);
        }
  `;

  const fadeInUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const Logo = () => {
    return (
      <Box
        sx={{
          display: "flex",
          marginRight: "auto",
          alignItems: "center",
          gap: "15px",
          marginTop: "1rem",
          animation: `${fadeInUp} 1s ease-out`,
        }}
      >
        <Link to="/">
          <Box
            component="img"
            src="openai.svg"
            alt="openai"
            sx={{
              width: { xs: "50px", sm: "80px", md: "90px" },
              height: { xs: "50px", sm: "80px", md: "90px" },
              animation: `${rotate} 3s alternate infinite`,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1) rotate(10deg)",
                animation: "none", // Stop continuous rotation on hover
              },
            }}
          />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
          sx={{
            display: "block", // Always visible on all screen sizes
            mr: "auto",
            fontWeight: 800,
            fontFamily: "sans-serif",
            color: "#E78F81",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" }, // Dynamically adjust size
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            opacity: 0,
            animation: `${fadeInUp} 1s ease-out forwards`,
            animationDelay: "0.5s",
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" }, // Adjust for different screen sizes
              fontFamily: "Satisfy, cursive",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            Zara
          </Box>
          -AI
        </Typography>

        </Link>
      </Box>
    );
  };

  export default Logo;
