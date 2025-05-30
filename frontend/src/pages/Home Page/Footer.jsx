import React from 'react'
import {
    Box,
    Typography,
    Link,
} from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                color: "#333",
                py: 4,
                px: 2,
                mt: 4,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 4, sm: 2 },
                }}
            >


                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        ml: 2
                    }}
                >
                    <Typography sx={{
                        fontSize: "clamp(0.3rem,1rem + 3vw,3rem)",
                        color: "#1E3E62"
                    }}>
                        Quick Links
                    </Typography>
                    <Link href="/" underline="hover" color="inherit" sx={{
                        fontFamily: "Poppins", fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)", fontWeight: "500"
                    }}>
                        Home
                    </Link>
                    <Link href="/about" underline="hover" color="inherit" sx={{
                        fontFamily: "Poppins", fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)", fontWeight: "500"
                    }}>
                        About
                    </Link>
                    <Link href="/contact" underline="hover" color="inherit" sx={{
                        fontFamily: "Poppins", fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)", fontWeight: "500"
                    }}>
                        Contact
                    </Link>

                </Box>
                <Box sx={{ maxWidth: "30rem" }}>
                    <Typography sx={{
                        fontSize: "clamp(0.3rem,1rem + 3vw,3rem)",
                        color: "#1E3E62",
                        mb: "2rem"
                    }}>
                        About Us
                    </Typography>
                    <Typography sx={{
                        fontFamily: "Poppins", fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)", fontWeight: "500", color: "#333"
                    }}>
                        We are a team dedicated to creating seamless user experiences. Stay
                        tuned for exciting updates!
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: { xs: "flex-start", sm: "flex-end" },
                        gap: 2,
                    }}
                >
                    <Typography sx={{
                        fontSize: "clamp(0.3rem,1rem + 3vw,3rem)",
                        color: "#1E3E62",
                        mb: "2rem"
                    }}>
                        Follow Us
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Link href="https://facebook.com" target="_blank" rel="noopener">
                            <img
                                src="https://img.icons8.com/color/48/facebook-circled--v1.png"
                                alt="Facebook"
                                width="50"
                            />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" rel="noopener">
                            <img
                                src="https://img.icons8.com/color/48/twitter-circled.png"
                                alt="Twitter"
                                width="50"
                            />
                        </Link>
                        <Link href="https://instagram.com" target="_blank" rel="noopener">
                            <img
                                src="https://img.icons8.com/color/48/instagram-new.png"
                                alt="Instagram"
                                width="50"
                            />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" rel="noopener">
                            <img
                                src="https://img.icons8.com/color/48/linkedin-circled--v1.png"
                                alt="LinkedIn"
                                width="50"
                            />
                        </Link>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="body2" sx={{ fontSize: "clamp(0.5rem,0.5rem + 2vw,1.5rem)" }}>
                    &copy; {new Date().getFullYear()} Zara AI. All rights
                    reserved.
                </Typography>
            </Box>
        </Box>
    )
}

export default Footer