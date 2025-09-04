import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import UserForm from '../components/UserForm';
// import UserList from '../components/UserList';  // Commented out or remove
import SpecializationsGrid from '../components/SpecializationsGrid';
import { useSpecialty } from '../contexts/SpecialtyContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { setSelectedSpecialty } = useSpecialty();
  const navigate = useNavigate();

  const handleSpecializationSelect = (specialty) => {
    setSelectedSpecialty(specialty);
    navigate('/consult');
  };

  return (
    <Container sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center', background: '#e7f3fa' }}>
        <Typography variant="h4" gutterBottom>
          Your Health, Our Priority
        </Typography>
        <Typography variant="subtitle1">
          Track your PCOS, manage your goals, and connect with care professionals.
        </Typography>
      </Paper>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Enter Patient Details
            </Typography>
            <UserForm />
          </Paper>
        </Grid>
        {/* Remove the UserList Grid to hide registered users */}
        {/* <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              PCOS Users
            </Typography>
            <UserList />
          </Paper>
        </Grid> */}
      </Grid>
      <SpecializationsGrid onSpecializationSelect={handleSpecializationSelect} />
    </Container>
  );
}

export default Dashboard;
