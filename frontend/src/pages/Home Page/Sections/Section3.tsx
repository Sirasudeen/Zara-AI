import { Player } from '@lottiefiles/react-lottie-player'
import { Box, Typography, useMediaQuery } from '@mui/material'

const Section3 = () => {
    return (
        <Box
            className="section-3"
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: '#FFFAF4',
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    overflow: "hidden",
                }}
            >
                <Typography
                    className='How'
                    sx={{ fontWeight: 700, color: '#1E3E62', mt: "15vh", ml: "clamp(0.2rem,0.1rem + 0.7vw,10vw)", marginBottom: '2rem', fontSize: "clamp(2rem,1rem + min(25vh,8vw),15rem)", width: "50vw" }}
                >
                    HOW IT WORKS
                </Typography>
            </Box>
            <Box
                className="workBox"
                sx={{
                    display: "flex",
                    gap: "4rem",
                    mt: "4rem",
                    textAlign: "left",
                }}>
                <Box
                    className="Step1"
                    data-speed="1"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "5%"
                    }}
                >
                    <Player
                        autoplay
                        loop
                        src='ask-question.json'
                        style={{ height: 'clamp(100px,100px + 30vw,350px)', width: 'clamp(100px,100px + 30vw,350px)' }}
                    />
                    <Typography variant="h6" sx={{ padding: "2%", fontWeight: 600, color: '#1E3E62', fontSize: "clamp(1.5rem,1rem + 1vw,2.5rem)" }}>
                        Ask a Question
                    </Typography>
                    <Typography sx={{
                        padding: "2%", color: '#555', fontFamily: "Poppins",
                        fontWeight: "500", fontSize: "clamp(0.7rem,0.7rem + 2vw,1.3rem)"
                    }}>
                        Submit your queries to Zara-AI and let the chatbot work its magic.
                    </Typography>
                </Box>
                {useMediaQuery("(min-width:1600px)") &&
                    <Box marginTop={30}>
                        <svg className='Step2' width="100" height="100" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_304_265)">
                                <path stroke="#9AA6B2" fill-rule="evenodd" clip-rule="evenodd" d="M7.57805 46.9883C68.0713 34.4739 114.729 75.8571 140.656 127.351C141.103 128.235 142.183 128.594 143.067 128.147C143.951 127.7 144.31 126.619 143.863 125.736C117.213 72.7981 69.0363 30.6078 6.84848 43.4738C5.87925 43.6723 5.25595 44.6224 5.45597 45.5959C5.65445 46.5651 6.60457 47.1883 7.57805 46.9883Z" fill="#9AA6B2" />
                                <path stroke="#9AA6B2" fill-rule="evenodd" clip-rule="evenodd" d="M141.774 125.577C139.153 123.821 135.888 121.581 135.511 121.337C125.27 114.742 114.555 110.088 102.789 106.839C101.835 106.574 100.844 107.137 100.579 108.092C100.314 109.047 100.877 110.037 101.832 110.302C113.242 113.449 123.635 117.96 133.568 124.359C134.147 124.731 141.483 129.771 143.043 130.679C143.681 131.054 144.158 131.068 144.271 131.061C144.873 131.044 145.256 130.785 145.51 130.528C145.794 130.237 146.146 129.641 146.11 128.748C146.069 127.813 145.509 125.904 145.407 125.411C143.884 117.967 141.535 109.791 140.902 101.8C140.298 94.1801 141.257 86.7195 146.292 80.3255C146.906 79.5477 146.769 78.4163 145.991 77.8026C145.213 77.1889 144.082 77.3257 143.468 78.1036C137.84 85.2533 136.647 93.5663 137.321 102.082C137.951 110.025 140.222 118.147 141.774 125.577Z" fill="#9AA6B2" />
                            </g>
                            <defs>
                                <clipPath id="clip0_304_265">
                                    <rect width="130" height="130" fill="white" transform="translate(45.1514 167.311) rotate(-110)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Box>
                }

                <Box
                    data-speed="0.8"
                    className="Step2"

                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Player
                        autoplay
                        loop
                        src='Personalized-help.json'
                        style={{ height: 'clamp(100px,100px + 30vw,350px)', width: 'clamp(100px,100px + 30vw,350px)' }}
                    />
                    <Typography sx={{ padding: "2%", mt: 0, fontWeight: 600, color: '#1E3E62', fontSize: "clamp(1.5rem,1rem + 1vw,2.5rem)" }}>
                        Get Personalized Help
                    </Typography>
                    <Typography sx={{
                        padding: "2%", color: '#555', width: "100%", fontFamily: "Poppins",
                        fontWeight: "500", fontSize: "clamp(0.7rem,0.7rem + 2vw,1.3rem)"
                    }}>
                        Zara-AI retrieves relevant information and crafts helpful responses.
                    </Typography>
                </Box>
                {useMediaQuery("(min-width:1600px)") &&
                    <Box marginTop={30}>

                        <svg className='Step3' width="100" height="100" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_304_265)">
                                <path stroke="#9AA6B2" fill-rule="evenodd" clip-rule="evenodd" d="M7.57805 46.9883C68.0713 34.4739 114.729 75.8571 140.656 127.351C141.103 128.235 142.183 128.594 143.067 128.147C143.951 127.7 144.31 126.619 143.863 125.736C117.213 72.7981 69.0363 30.6078 6.84848 43.4738C5.87925 43.6723 5.25595 44.6224 5.45597 45.5959C5.65445 46.5651 6.60457 47.1883 7.57805 46.9883Z" fill="#9AA6B2" />
                                <path stroke="#9AA6B2" fill-rule="evenodd" clip-rule="evenodd" d="M141.774 125.577C139.153 123.821 135.888 121.581 135.511 121.337C125.27 114.742 114.555 110.088 102.789 106.839C101.835 106.574 100.844 107.137 100.579 108.092C100.314 109.047 100.877 110.037 101.832 110.302C113.242 113.449 123.635 117.96 133.568 124.359C134.147 124.731 141.483 129.771 143.043 130.679C143.681 131.054 144.158 131.068 144.271 131.061C144.873 131.044 145.256 130.785 145.51 130.528C145.794 130.237 146.146 129.641 146.11 128.748C146.069 127.813 145.509 125.904 145.407 125.411C143.884 117.967 141.535 109.791 140.902 101.8C140.298 94.1801 141.257 86.7195 146.292 80.3255C146.906 79.5477 146.769 78.4163 145.991 77.8026C145.213 77.1889 144.082 77.3257 143.468 78.1036C137.84 85.2533 136.647 93.5663 137.321 102.082C137.951 110.025 140.222 118.147 141.774 125.577Z" fill="#9AA6B2" />
                            </g>
                            <defs>
                                <clipPath id="clip0_304_265">
                                    <rect width="130" height="130" fill="white" transform="translate(45.1514 167.311) rotate(-110)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Box>
                }

                <Box
                    className="Step3"
                    data-speed="0.6"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        paddingBottom: "20rem"
                    }}
                >
                    <Player
                        autoplay
                        loop

                        src='goal.json'
                        style={{ height: 'clamp(100px,100px + 30vw,350px)', width: 'clamp(100px,100px + 30vw,350px)' }}
                    />
                    <Typography variant="h6" sx={{ padding: "2%", fontWeight: 600, color: '#1E3E62', fontSize: "clamp(1.5rem,1rem + 1vw,2.5rem)" }}>
                        Achieve Your Goals
                    </Typography>
                    <Typography sx={{
                        padding: "2%", color: '#555', fontFamily: "Poppins",
                        fontWeight: "500", fontSize: "clamp(0.7rem,0.7rem + 2vw,1.3rem)"
                    }}>
                        Use the tailored guidance to stay on track and reach your academic milestones.
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Section3