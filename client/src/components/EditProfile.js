// src/components/EditProfile.js
import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

const EditProfile = ({ user, onSave, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) setFormData({
      name: user.name || '',
      email: user.email || '',
      age: user.age || '',
      weight: user.weight || '',
      height: user.height || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData).catch((errMsg) => {
      setError(errMsg || 'Failed to update profile.');
    });
  };

  const handleCloseSnackbar = () => {
    setError('');
  };

  return (
    <Container sx={{ maxWidth: 400, mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Edit Profile</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required type="email" />
          <TextField fullWidth label="Age" name="age" value={formData.age} onChange={handleChange} margin="normal" type="number" />
          <TextField fullWidth label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} margin="normal" type="number" />
          <TextField fullWidth label="Height (cm)" name="height" value={formData.height} onChange={handleChange} margin="normal" type="number" />
          <Button variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </form>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default EditProfile;
