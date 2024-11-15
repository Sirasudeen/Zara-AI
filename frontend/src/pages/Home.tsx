import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      width='100%'
      minHeight='100vh'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        padding: { xs: '2rem', md: '4rem' },
      }}
    >
      <Box
        sx={{
          padding: { xs: '2rem', md: '4rem' },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'left',
          textAlign: 'left',
          gap: '2rem',
          marginTop: { xs: '2rem', md: '3rem' },
          marginRight: { xs: '3.5rem', md: 'auto' },
          maxWidth: 'auto',
          width: 'auto',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            gap: '1rem',
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h4' : 'h2'}
            sx={{
              fontWeight: 700,
              color: '#1E3E62',
            }}
          >
            Welcome to Zara-AI
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.2rem', md: '1.6rem' },
              color: '#1E3E62',
              maxWidth: '600px',
            }}
          >
            Guiding you through academics and helping you stay stress-free,
            every step of the way.
          </Typography>
          <Button
            onClick={() => navigate('/signup')}
            sx={{
              backgroundColor: '#FFAD60',
              color: '#fff',
              padding: { xs: '10px 20px', md: '12px 24px' },
              fontSize: { xs: '1rem', md: '1.2rem' },
              marginTop: '1rem',
              borderRadius: '10px',
              fontFamily: 'Roboto',
              textTransform: 'none',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#FFD09B',
                transform: 'scale(1.05)',
              },
              '&:active': {
                backgroundColor: '#03dac6',
                transform: 'scale(0.95)',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
      {!isSmallScreen && (
        <Box>
          <Player
            autoplay
            loop
            src='home-robot.json'
            style={{ height: '500px', width: '500px', marginRight: '12rem' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
