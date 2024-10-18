// src/components/TypingAnim.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const messages = [
  "Ace your academics with Zara 🤖",
  "Your customized RAG application 💻",
];

const TypingAnim = () => {
  const [current, setCurrent] = useState(0);
  const [fadeProp, setFadeProp] = useState({
    fade: "fade-in",
  });

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      setFadeProp({ fade: "fade-out" });

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        setFadeProp({ fade: "fade-in" });
      }, 1000); 
    }, 3000); 

    return () => clearInterval(fadeTimeout);
  }, [current]);

  return (
    <Box className="typing-anim-container">
      <Typography className={`typing-anim-text ${fadeProp.fade}`}>
        {messages[current]}
      </Typography>
    </Box>
  );
};

export default TypingAnim;
