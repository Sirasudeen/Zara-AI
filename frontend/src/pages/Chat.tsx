// src/components/Chat.tsx

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton, CircularProgress } from "@mui/material";
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

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle sending user messages
  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim() as string;
    if (!content) {
      toast.error("Please enter a message");
      return;
    }

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error: any) {
      console.log(error);
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
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  // Load chat history on component mount
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
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
        height: "100%",
        mt: 3,
        gap: 3,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Main Chat Area */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          width: "100%",
          maxWidth: "800px",
          px: 3,
        }}
      >
        {/* Chatbot Title */}
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
            backgroundColor: "#7E60BF",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Zara - AI
        </Typography>

        {/* Chat Messages Container */}
        <Box
          sx={{
            width: "100%",
            flex: 1,
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            scrollBehavior: "smooth",
            bgcolor: "#F5F5F5",
            p: 2,
            mb: 2,
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
              <Avatar sx={{ ml: "0" }}>
                <img src="zara_avatar.png" alt="Zara" width={"30px"} />
              </Avatar>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress size={24} sx={{ mr: 2 }} />
                <Typography sx={{ fontSize: "20px" }}>Zara is typing...</Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Chat Input Area */}
        <Box
          sx={{
            width: "100%",
            borderRadius: "20px",
            backgroundColor: "#E78F81",
            display: "flex",
            margin: "auto",
            mt: 2,
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
              width: "100%",
              backgroundColor: "#FFF5CD",
              padding: "20px",
              border: "none",
              borderRadius: "20px",
              outline: "none",
              color: "#0B192C",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </Box>

        {/* Clear Conversation Button */}
        <Button
          onClick={handleDeleteChats}
          sx={{
            width: "200px",
            my: "auto",
            color: "#433878",
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
            bgcolor: "#FFE1FF",
            ":hover": {
              bgcolor: "#E4B1F0",
            },
            mt: 2,
          }}
        >
          Clear Conversation
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
