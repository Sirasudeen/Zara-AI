import { Box, useMediaQuery, useTheme,Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TypingAnim from "../components/typer/TypingAnim";

const Home = () => {
const navigate = useNavigate();

  return (
    <Box width={"100%"} height={"100%"} sx={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>
      <Box
        sx={{
          p:"4rem",
          display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',
          gap: '1rem',
          mt:'3rem'
        }} 
      >
        <TypingAnim />
          <Box sx={{width:"50rem",textAlign: 'center'}}>
          <Typography sx ={{ fontSize:'2rem', color:"#1E3E62"}}>
        Guiding you through academics and helping you stay stress-free, every step of the way.
        </Typography>
        
          </Box>
          <Button
          onClick={() => navigate('/signup')}
          sx={{
            
            backgroundColor: '#FFAD60', // Custom purple color
            color: '#fff',
            padding: '10px 20px',
            fontSize: '1.6rem',
            mt:'1rem',
            borderRadius: '10px',
            textTransform: 'none', // Disabling uppercase text transformation
            '&:hover': {
              backgroundColor: '#FFD09B', 
              transform: "scale(1.1)",
              // Darker purple on hover
            },
            '&:active': {
              backgroundColor: '#03dac6', // Teal on active click
            },
          }}
        >
          Get started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
