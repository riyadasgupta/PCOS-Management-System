import React from 'react';
import { Container, Typography, Grid, Paper, Card, CardMedia, CardContent, Box } from '@mui/material';
import UserForm from '../components/UserForm';
// import UserList from '../components/UserList';  // Removed as per your request
import SpecializationsGrid from '../components/SpecializationsGrid';
import { useSpecialty } from '../contexts/SpecialtyContext';
import { useNavigate } from 'react-router-dom';

const dashboardImages = [
  {
    src: '/images/healthy_meal.jpg',
    title: 'Healthy Meal',
    description: 'Delicious balanced food for better PCOS management',
  },
  {
    src: '/images/yoga_session.avif',
    title: 'Yoga Session',
    description: 'Daily yoga practices to reduce stress and improve wellness',
  },
  {
    src: '/images/consultation.jpg',
    title: 'Doctor Consultation',
    description: 'Connect with certified health professionals',
  },
];

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
      </Grid>

      <SpecializationsGrid onSpecializationSelect={handleSpecializationSelect} />

      {/* Image Gallery Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Wellness Gallery
        </Typography>
        <Grid container spacing={3}>
          {dashboardImages.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.src}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
