import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import './SpaceAnimation.css';


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
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box 
      className="container"
      width={"100%"} 
      height={"100vh"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}
      position="relative"
      overflow="hidden"
    >

      <img src="/earth.png" alt="Earth" width={100} className="planet earth" />
      <img src="/saturn.png" alt="Saturn" width={100} className="planet saturn" />
      <img src="/comet.svg" alt="Comet" width={100} className="comet" />
      <Box padding={8} marginLeft={65} display={{ md: "flex", sm: "none", xs: "none" }}
        sx={{
          animation: 'sway 2s infinite alternate',
        }}
      >
        <img src="astronaut.svg" alt="Robot" style={{ width: "600px" }} />
      </Box>
      <form
        onSubmit={handleSubmit}
        style={{
          animation: 'sway 2s infinite alternate',
        }}
        className="form sway" 
      >
        <Box className="form-content">
          <Typography
            variant="h4"
            textAlign="center"
            padding={2}
            fontWeight={600}
            sx={{
              color: "#B17457"
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

export default Login;
