import React from 'react'
import Magnet from '../../../blocks/Animations/Magnet/Magnet';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const HeroBtn = () => {
    const navigate = useNavigate();
    return (
        <Magnet disabled={false} magnetStrength={80}>
            <Button
                className='introButton'
                onClick={() => navigate('/signup')}
                sx={{
                    backgroundColor: '#FFAD60',
                    color: '#fff',
                    padding: { xs: '10px 20px', md: '12px 24px' },
                    fontSize: 'clamp(1rem,1rem + min(3vh,1vw),1.4rem)',
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
        </Magnet>
    )
}
export default HeroBtn;