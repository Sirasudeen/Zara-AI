// src/components/Chat.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  keyframes
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

// Define the Message type
type Message = {
  role: "user" | "assistant";
  content: string;
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoading]);

  // Handle sending user messages
  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim();
    if (!content) {
      toast.error("Please enter a message");
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const chatData = await sendChatRequest(content);
      if (chatData && chatData.chats) {
        setChatMessages([...chatData.chats]);
      } else if (chatData && chatData.message) {
        // If chatData.chats is not defined, append the assistant's message
        const assistantMessage: Message = { role: "assistant", content: chatData.message };
        setChatMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting chat history
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.error(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  // Load chat history on component mount
  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          if (data && data.chats) {
            setChatMessages([...data.chats]);
            toast.success("Successfully loaded chats", { id: "loadchats" });
          } else {
            toast.error("No chat history found", { id: "loadchats" });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        gap: 3,
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      {/* Main Chat Area and Zara AI Sidebar */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100%",
          maxWidth: "1200px", // Increased maxWidth for larger screens
          gap: 3,
          flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium and up
        }}
      >
        {/* Chat Column */}
        <Box
          sx={{
            display: "flex",
            flex: 3,
            flexDirection: "column",
            width: "100%",
            borderRadius: "10px",
            padding: 3,
            boxSizing: "border-box",
            height: { xs: "auto", md: "80vh" }, // Adjust height for responsiveness
          }}
        >
          {/* Chat Messages Container */}
          <Box
            sx={{
              width: "100%",
              flex: 1,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              scrollBehavior: "smooth",
              bgcolor: "#F5F5F5",
              p: 2,
              mb: 1,
              maxHeight: "80vh", // Adjusted maxHeight for better space utilization
            }}
          >
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  bgcolor: "#004d5612",
                  gap: 2,
                  borderRadius: 2,
                  my: 1,
                }}
              >
                <Avatar sx={{ ml: "0", animation: "${spin} 2s linear infinite " }}>
                  <img src="/openai.svg" alt="Zara" width={"30px"} />
                </Avatar>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CircularProgress size={24} sx={{ mr: 2 }} />
                  <Typography sx={{ fontSize: "20px" }}>Zara is typing...</Typography>
                </Box>
              </Box>
            )}

            {/* Dummy div to scroll into view */}
            <div ref={messagesEndRef} />
          </Box>

          {/* Chat Input Area */}
          <Box
            sx={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "#E78F81",
              display: "flex",
              alignItems: "center",
              padding: "5px 10px",
              gap: 1,
            }}
          >
            <input
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
              ref={inputRef}
              type="text"
              placeholder="Ask Zara for help..."
              style={{
                flex: 1,
                backgroundColor: "#FFF5CD",
                padding: "10px 15px",
                border: "none",
                borderRadius: "20px",
                outline: "none",
                color: "#0B192C",
                fontSize: "16px",
              }}
            />
            <IconButton
              onClick={handleSubmit}
              sx={{
                color: "white",
                backgroundColor: "#7E60BF",
                "&:hover": {
                  backgroundColor: "#654A99",
                },
                padding: "10px",
                borderRadius: "50%",
              }}
              aria-label="Send message"
            >
              <IoMdSend />
            </IconButton>
          </Box>
        </Box>

        {/* Zara AI Sidebar */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            width: "100%",
            maxWidth: "300px",
            bgcolor: "#7E60BF",
            mt:"20vh",
            borderRadius: "10px",
            padding: 3,
            boxSizing: "border-box",
            color: "white",
            height: { xs: "auto", md: "50vh" }, // Adjust height for responsiveness
          }}
        >
          {/* Zara AI Title */}
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              mb: 1,
            }}
          >
            Zara - AI
          </Typography>

          {/* Zara AI Description */}
          <Typography
            sx={{
              fontSize: "16px",
              mb: 3,
            }}
          >
            Your personal AI assistant to help you with tasks, answer questions, and provide insights.
          </Typography>

          {/* Clear Conversation Button */}
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "100%",
              color: "#433878",
              fontWeight: "700",
              borderRadius: 3,
              bgcolor: "#FFE1FF",
              ":hover": {
                bgcolor: "#E4B1F0",
              },
              textTransform: "none",
              padding: "10px 0",
              fontSize: "16px",
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
