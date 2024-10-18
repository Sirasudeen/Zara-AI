
import React from "react";
import { Box, Avatar, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";

function extractCodeFromString(message: string) {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  const blocks = [];
  let lastIndex = 0;

  while ((match = regex.exec(message)) !== null) {
    const [fullMatch, language, code] = match;
    const index = match.index;

    if (lastIndex < index) {
      blocks.push({
        text: message.substring(lastIndex, index),
        isCode: false,
      });
    }

    blocks.push({
      code: code.trim(),
      language: language || "javascript",
      isCode: true,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < message.length) {
    blocks.push({
      text: message.substring(lastIndex),
      isCode: false,
    });
  }

  return blocks;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const containerVariants = {
    hidden: { opacity: 0, x: role === "user" ? 50 : -50 },
    visible: { opacity: 1, x: 0 },
  };

  return role === "assistant" ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "#FFFFFF",
          gap: 2,
          borderRadius: 2,
          my: 1,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
          alignItems: "flex-start",
        }}
      >
        <Avatar sx={{ background: "#7E60BF" }}>
          <Typography variant="body1" color="white">
            Z
          </Typography>
        </Avatar>
        <Box>
          {messageBlocks.map((block, index) =>
            block.isCode ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={block.language}
                wrapLongLines
                customStyle={{
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "14px",
                  backgroundColor: "#2D2D2D",
                }}
              >
                {block.code}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={index}
                sx={{
                  fontSize: "16px",
                  color: "#0B192C",
                  mb: block.text.endsWith("\n") ? 1 : 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {block.text}
              </Typography>
            )
          )}
        </Box>
      </Box>
    </motion.div>
  ) : (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          p: 2,
          bgcolor: "#E7CCCC",
          gap: 2,
          borderRadius: "20px",
          marginBottom: "20px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
          alignItems: "flex-start",
        }}
      >
        <Avatar sx={{ bgcolor: "#0B192C" }}>
          {auth?.user?.name[0].toUpperCase()}
        </Avatar>
        <Box>
          {messageBlocks.map((block, index) =>
            block.isCode ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={block.language}
                wrapLongLines
                customStyle={{
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "14px",
                  backgroundColor: "#2D2D2D",
                }}
              >
                {block.code}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={index}
                sx={{
                  fontSize: "16px",
                  color: "#433878",
                  mb: block.text.endsWith("\n") ? 1 : 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {block.text}
              </Typography>
            )
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default ChatItem;
