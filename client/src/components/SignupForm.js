import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { useAuth } from "./AuthContext";

const SignupForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      login(res.data.token);
      setError("");
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || "Failed to register");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 360, mx: "auto" }}>
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      <TextField label="Name" name="name" fullWidth required margin="normal" value={formData.name} onChange={handleChange} />
      <TextField label="Email" name="email" fullWidth required margin="normal" value={formData.email} onChange={handleChange} />
      <TextField label="Password" name="password" type="password" fullWidth required margin="normal" value={formData.password} onChange={handleChange} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Sign Up</Button>
    </Box>
  );
};

export default SignupForm;
