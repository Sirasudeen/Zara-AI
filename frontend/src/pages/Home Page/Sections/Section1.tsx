import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import HeroBtn from '../Buttons/HeroBtn'



const Section1 = () => {

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isBigScreen = useMediaQuery('(min-width:1800px)');

    return (
        <Box
            sx={{
                minHeight: '100vh',
            }}
        >
            <Box
                className="section-1"

                sx={{
                    display: 'flex',
                    width: '100%',
                    position: "absolute",
                    gap: '30rem',
                    minHeight: '100vh',
                    zIndex: 30,
                    background: 'url("bg.jpg")'
                }}

            >
                <Box
                    className='intro'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isBigScreen ? 'left' : 'center',
                        textAlign: isBigScreen ? 'left' : 'center',
                        justifyContent: 'center',
                        paddingLeft: isSmallScreen ? "0.5rem" : "1rem"
                    }}
                >
                    <Typography
                        id='intro'
                        sx={{ fontWeight: 650, color: '#1E3E62', fontSize: 'clamp(2rem,1rem + min(5vh,4vw),4.5rem)', fontFamily: "Hey Comic" }}
                    >

                    </Typography>
                    <Typography
                        className='introSub'
                        sx={{
                            fontSize: 'clamp(0.5rem,1rem + min(3.5vh,1.1vw),2rem)',
                            color: '#3E5879',
                            maxWidth: 'clamp(1.5rem,1.5rem + 45vw,35rem)',
                            marginTop: '1rem',
                        }}
                    >
                        {`Guiding you through academics and helping you stay stress-free, every step of the way.`
                            .split(' ')
                            .map((word, index) => (
                                <span key={index} className="word">
                                    {word}&nbsp;
                                </span>
                            ))}
                    </Typography>

                    <HeroBtn />


                </Box>


            </Box>
        </Box>
    )
}

export default Section1