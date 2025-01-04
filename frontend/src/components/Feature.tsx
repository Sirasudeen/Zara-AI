import { useGSAP } from '@gsap/react'
import { Box, Typography } from '@mui/material'



const Feature = ({Title,Description,ClassName} : {Title : string, Description: string,ClassName?: string} ) => {



  return (
    <Box
    className={ClassName || ''}
    sx={{
      backgroundColor: '#FFFFFF',
      padding: '2rem',
      postion:"absolute",
      borderRadius: "10px",
      textAlign: 'center',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E3E62' }}>
      {Title}
    </Typography>
    <Typography sx={{ color: '#555', marginTop: '1rem' }}>
     {Description}
    </Typography>
  </Box>
  )
}

export default Feature