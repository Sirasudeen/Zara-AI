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
  }, [auth]);
  return (
        
      <Box
        width={"100%"} 
        height={"100%"}
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        mt={8}
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
            margin: "auto",
            padding: "30px",
            borderRadius: "10px",
            border: "none",
            background : "#D8D2C2",
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            top: "15rem",
            position: 'absolute',
            animation: 'sway 2s infinite alternate',
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",


            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
              sx={{
            color: "#B17457"
              }}
            >
              Sign up
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
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
