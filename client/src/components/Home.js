import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Box, Paper, Typography, Link } from "@mui/material";
import Dashboard from "../pages/Dashboard";

function Home() {
  const { user } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (user) {
    return <Dashboard />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start", 
        justifyContent: "center",
        bgcolor: "#f4f8fc",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          width: 350,
          mx: "auto",
          textAlign: "center",
          borderRadius: 3,
          mt: 10, 
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          {showSignup ? "Sign Up" : "Login"}
        </Typography>
        {showSignup ? <SignupForm /> : <LoginForm />}
        <Box sx={{ mt: 3 }}>
          <Link
            component="button"
            variant="body2"
            sx={{ textDecoration: "none", fontWeight: 500, color: "#2596be" }}
            onClick={() => setShowSignup(!showSignup)}
          >
            {showSignup
              ? "Already have an account? Log In"
              : "New user? Sign Up"}
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;

