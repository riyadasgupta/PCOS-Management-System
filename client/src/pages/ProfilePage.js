import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Button, CircularProgress, Box, Avatar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../components/EditProfile';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/user/me', {
          headers: { 'x-auth-token': token }
        });

        // Handle invalid response (HTML, 404, etc.)
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Profile fetch failed. Status:', res.status, 'Response:', errorText);
          setError('Profile fetch failed: Server responded with error.');
          setUser(null);
        } else {
          try {
            const data = await res.json();
            setUser(data);
          } catch (jsonErr) {
            const errorText = await res.text();
            console.error('Profile fetch failed. JSON parse error:', jsonErr, 'Full response:', errorText);
            setError('Profile fetch failed: Received invalid data from server.');
            setUser(null);
          }
        }
      } catch (err) {
        setError('Network error or backend not reachable.');
        setUser(null);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => setEditing(true);

  const handleSave = async (formData) => {
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error('Profile update failed. Status:', res.status, 'Response:', errText);
        setError('Profile update failed: Server responded with error.');
        throw new Error('Failed to update profile.');
      }
      const updatedUser = await res.json();
      setUser(updatedUser);
      setEditing(false);
      return true;
    } catch (err) {
      setError('Could not update profile.');
      return Promise.reject(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getInitial = (name) => (name ? name[0].toUpperCase() : '');

  if (loadingProfile) {
    return (
      <Container sx={{ minHeight: 450, textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ minHeight: 450 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="error">{error}</Alert>
          <Typography variant="h6" sx={{ mt: 2 }}>Please log in to view your profile.</Typography>
        </Paper>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ minHeight: 450, mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">Please log in to view your profile.</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/login')}>
            Login
          </Button>
        </Paper>
      </Container>
    );
  }

  if (editing) {
    return <EditProfile user={user} onSave={handleSave} loading={saving} />;
  }

  return (
    <Container sx={{ minHeight: 450 }}>
      <Paper sx={{ p: 3, textAlign: 'center', maxWidth: 400, mx: 'auto' }}>
        <Avatar sx={{ bgcolor: "#2596be", mx: 'auto', mb: 2, width: 64, height: 64 }}>
          {getInitial(user.name)}
        </Avatar>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="body1" color="text.secondary">{user.email}</Typography>
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Typography><b>Age:</b> {user.age}</Typography>
          <Typography><b>Weight:</b> {user.weight} kg</Typography>
          <Typography><b>Height:</b> {user.height} cm</Typography>
        </Box>
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleEditClick}>EDIT PROFILE</Button>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
