import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';



const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box width="100%" sx={{ backgroundColor: '#FFAD60',overflow: 'auto' }}>
      {/* Hero Section */}
      <Box
      sx={{
        display:'flex',
        flexDirection: 'row',
        minHeight: '90vh',
        gap: '30rem',
        padding: { xs: '2rem', md: '4rem' },
        backgroundColor: 'powderblue',
      }}
      >

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          textAlign: 'left',
          justifyContent: 'center'

        }}
      >
        <Typography
          sx={{ fontWeight: 650, color: '#1E3E62', fontSize: '4.5rem' }}
        >
          Hi, I'am Zara.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1.4rem', md: '1.8rem' },
            color: '#1E3E62',
            maxWidth: '600px',
            marginTop: '1rem',
          }}
        >
          Guiding you through academics and helping you stay stress-free, every
          step of the way.
        </Typography>
        <Button
          onClick={() => navigate('/signup')}
          sx={{
            backgroundColor: '#FFAD60',
            color: '#fff',
            padding: { xs: '10px 20px', md: '12px 24px' },
            fontSize: { xs: '1rem', md: '1.2rem' },
            marginTop: '2rem',
            borderRadius: '10px',
            textTransform: 'none',
            width: "fit-content",
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: '#FFD09B' },
          }}
        >
          Get Started
        </Button>
        
      </Box>
      <Box
      sx={{
        justifyContent: 'center',
      }}
      >
          <Player
            autoplay
            loop
            src='home-robot.json'
            style={{ height: '600px', width: '600px', marginTop: "12rem" }}
          />
        </Box>
      </Box>


      {/* Features Section */}
      <Box sx={{ padding: { xs: '2rem', md: '4rem',minHeight: '100vh' }, backgroundColor: '#FFAD60' }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#1E3E62', textAlign: 'center', marginBottom: '2rem' }}
        >
          Explore Zara-AI Features
        </Typography>

        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E3E62' }}>
                Academic Support
              </Typography>
              <Typography sx={{ color: '#555', marginTop: '1rem' }}>
                Get personalized help with studies to keep you on track and achieve your goals.
              </Typography>
            </Box>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E3E62' }}>
                Motivational Guidance
              </Typography>
              <Typography sx={{ color: '#555', marginTop: '1rem' }}>
                Stay stress-free with humor-filled and motivational responses tailored to your needs.
              </Typography>
            </Box>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E3E62' }}>
                Stress Relief Tips
              </Typography>
              <Typography sx={{ color: '#555', marginTop: '1rem' }}>
                Practical advice to handle stress effectively and maintain a balanced lifestyle.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* How It Works Section */}
      <Box
        sx={{
          padding: { xs: '2rem', md: '4rem',minHeight: '100vh'  },
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#1E3E62', marginBottom: '2rem' }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E3E62' }}>
              1. Ask a Question
            </Typography>
            <Typography sx={{ color: '#555' }}>
              Submit your queries to Zara-AI and let the chatbot work its magic.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E3E62' }}>
              2. Get Personalized Help
            </Typography>
            <Typography sx={{ color: '#555' }}>
              Zara-AI retrieves relevant information and crafts helpful responses.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E3E62' }}>
              3. Achieve Your Goals
            </Typography>
            <Typography sx={{ color: '#555' }}>
              Use the tailored guidance to stay on track and reach your academic milestones.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ padding: { xs: '2rem', md: '4rem',minHeight: '100vh'  }, backgroundColor: '#F4F6F8' }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#1E3E62', textAlign: 'center', marginBottom: '2rem' }}
        >
          What Our Users Say
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="body1" sx={{ color: '#555' }}>
                "Zara-AI helped me stay organized during my exams. Highly recommend it!"
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: '#1E3E62',
                  marginTop: '1rem',
                }}
              >
                - John Doe, Student
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="body1" sx={{ color: '#555' }}>
                "The stress relief tips were just what I needed. Zara-AI is amazing!"
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: '#1E3E62',
                  marginTop: '1rem',
                }}
              >
                - Jane Smith, Student
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          textAlign: 'center',
          padding: { xs: '2rem', md: '4rem' },
          backgroundColor: '#FFAD60',
          minHeight: '100vh' 
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}
        >
          Ready to Transform Your Academic Journey?
        </Typography>
        <Button
          onClick={() => navigate('/signup')}
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#FFAD60',
            padding: { xs: '10px 20px', md: '12px 24px' },
            fontSize: { xs: '1rem', md: '1.2rem' },
            borderRadius: '10px',
            textTransform: 'none',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': { backgroundColor: '#FFD09B', color: '#FFFFFF' },
          }}
        >
          Get Started Now
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
