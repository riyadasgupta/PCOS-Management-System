import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useAuth } from "./AuthContext";

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      login(res.data.token);
      setError("");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Typography color="error" mb={2}>{error}</Typography>
      )}
      <TextField
        label="Email"
        name="email"
        fullWidth
        required
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        required
        margin="normal"
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: "#2596be" }}>
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;
