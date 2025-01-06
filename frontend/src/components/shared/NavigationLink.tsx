// NavigationLink.jsx
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { keyframes } from "@mui/system";
import { useState } from "react";
import { Box } from "@mui/material";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const slideIn = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(231, 143, 129, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(231, 143, 129, 1);
  }
  100% {
    box-shadow: 0 0 5px rgba(231, 143, 129, 0.5);
  }
`;

const StyledLink = styled(Link)<Props>(({ bg, textColor }) => ({
  position: "relative",
  display: "inline-block",
  padding: "10px 20px",
  margin: "0 10px",
  fontFamily:"Poppins",
  borderRadius: "5px",
  background: bg,
  color: textColor,
  textDecoration: "none",
  fontWeight: 600,
  overflow: "hidden",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "2px",
    backgroundColor: textColor,
    width: 0,
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "100%",
    animation: `${slideIn} 0.3s forwards`,
  },
}));

const NavigationLink = (props: Props) => {
  const location = useLocation();
  const isActive = location.pathname === props.to;
  const [rippleArray, setRippleArray] = useState([]);

  const handleClick = (e) => {
    const rippleContainer = e.currentTarget.getBoundingClientRect();
    const size = rippleContainer.width;
    const x = e.clientX - rippleContainer.left - size / 2;
    const y = e.clientY - rippleContainer.top - size / 2;
    const newRipple = { x, y, size };
    setRippleArray([...rippleArray, newRipple]);
    if (props.onClick) props.onClick();
    
  };

  return (
    <StyledLink
      to={props.to}
      bg={props.bg}
      textColor={props.textColor}
      onClick={handleClick}
      sx={{
        boxShadow: isActive ? "0 0 10px rgba(231, 143, 129, 1)" : "none",
        animation: isActive ? `${glow} 2s infinite` : "none",
      }}
    >
      {props.text}
      {rippleArray.map((ripple, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            animation: "ripple 0.6s ease-out",
          }}
        />
      ))}
      <style>
        {`
          @keyframes ripple {
            from {
              transform: scale(0);
              opacity: 1;
            }
            to {
              transform: scale(4);
              opacity: 1;
            }
          }
        `}
      </style>
    </StyledLink>
  );
};

export default NavigationLink;
