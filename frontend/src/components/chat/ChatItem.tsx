// src/components/chat/ChatItem.tsx

import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Function to extract code blocks and text
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

// Function to determine if a block is code
function isCodeBlock(str: string) {
  // This function is now redundant due to improved parsing in extractCodeFromString
  return false;
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
  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0", background: "transparent" }}>
        <img src="openai.svg" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks.length && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks.length > 0 &&
          messageBlocks.map((block, index) =>
            block.isCode ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={block.language}
              >
                {block.code}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px",color:"black" }}>
                {block.text}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#E7CCCC",
        gap: 2,
        borderRadius: "20px",
        marginBottom: "20px",
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
      </Avatar>
      <Box>
        {!messageBlocks.length && (
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontFamily: "cursive",
              color: "#603F26",
            }}
          >
            {content}
          </Typography>
        )}
        {messageBlocks.length > 0 &&
          messageBlocks.map((block, index) =>
            block.isCode ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language={block.language}
              >
                {block.code}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block.text}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
