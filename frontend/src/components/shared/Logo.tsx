// Logo.jsx
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

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
        display: 'flex',
        marginRight: 'auto',
        alignItems: 'center',
        gap: '15px',
        animation: `${fadeInUp} 1s ease-out`,
      }}
    >
      <Link to='/'>
        <Box
          component='img'
          src='openai.svg'
          alt='openai'
          sx={{
            width: { xs: '40px', sm: '860px', md: '70px' },
            height: { xs: '40px', sm: '60px', md: '70px' },
            animation: `${rotate} 3s alternate infinite`,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1) rotate(10deg)',
              animation: 'none', // Stop continuous rotation on hover
            },
          }}
        />
      </Link>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Typography
          sx={{
            display: 'block', // Always visible on all screen sizes
            mr: 'auto',
            fontWeight: 800,
            fontFamily: 'sans-serif',
            color: '#E78F81',
            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem', lg: '2.3rem' }, // Dynamically adjust size
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            opacity: 0,
            animation: `${fadeInUp} 1s ease-out forwards`,
            animationDelay: '0.5s',
          }}
        >
          <Box
            component='span'
            sx={{
              fontSize: { xs: '1.5rem', sm: '2.1rem', md: '3.2rem' }, // Adjust for different screen sizes
              fontFamily: 'Satisfy, cursive',
              display: 'inline-block',
              verticalAlign: 'middle',
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
