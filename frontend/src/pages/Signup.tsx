import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import './SpaceAnimation.css';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <Box
      className="container"

      sx={{
        background: 'url("bg.jpg")',
        width:"100%",
        padding:0,
        margin:0,
        minheight:"100vh",
        display: "flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
      }}
    >
      <img src="/earth.png" alt="Earth" width={100} className="planet earth" />
      <img src="/saturn.png" alt="Saturn" width={100} className="planet saturn" />
      <img src="/comet.svg" alt="Comet" width={100} className="comet" />


      <form
        onSubmit={handleSubmit}
        style={{
          animation: 'sway 2s infinite alternate',
          margin:"4% 0 0 0"

        }}
        className="form sway"
      >
        <Box className="form-content">
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={600}
            sx={{
              fontSize:"clamp(0.8rem,0.8rem + 10vw,2.5rem)",
              color: "#B17457"
            }}
          >
            Sign Up
          </Typography>
          <CustomizedInput type="text" name="name" label="Name" />
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
            Signup
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

export default Signup;
