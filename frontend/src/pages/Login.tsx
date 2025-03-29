// frontend/src/pages/Login.tsx

import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './SpaceAnimation.css';
import transition from "../components/transition/transition.js";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <Box
      className="container"


      sx={{
        background: 'url("bg.jpg")',
        width: "100%",
        padding: 0,
        margin: 0,
        minheight: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <img src="/earth.png" alt="Earth" width={100} className="planet earth" />
      <img src="/saturn.png" alt="Saturn" width={100} className="planet saturn" />
      <img src="/comet.svg" alt="Comet" width={100} className="comet" />


      <form
        onSubmit={handleSubmit}
        style={{
          animation: 'sway 2s infinite alternate',
          margin: "4% 0 0 0"
        }}
        className="form sway"
      >
        <Box className="form-content" >
          <Typography

            textAlign="center"
            padding={2}
            fontWeight={600}
            sx={{
              color: "#B17457",
              fontSize: "clamp(0.8rem,0.8rem + 10vw,2.5rem)"
            }}
          >
            Login
          </Typography>
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            className="button"
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              borderRadius: 2,
              bgcolor: "#00fffc",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
            endIcon={<IoIosLogIn />}
          >
            Login
          </Button>
          <style>
            {`
              @keyframes sway {
                0% {
                  transform: translateY(0);
                }
                100% {
                  transform: translateY(-10px);
                }
              }
            `}
          </style>
        </Box>
      </form>
    </Box>
  );
};
const TLOGIN = transition(Login)

export default TLOGIN;
