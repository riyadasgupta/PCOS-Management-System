import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Snackbar, Alert, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DoctorList from '../components/DoctorList';
import AppointmentForm from '../components/AppointmentForm';

const BookAppointmentPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookedDoctor, setBookedDoctor] = useState(null); 
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    console.log('Selected Doctor:', selectedDoctor);
  }, [selectedDoctor]);

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingSuccess(false);
    setErrorMessage('');
    setBookedDoctor(null);
  };

  const handleAppointmentSubmit = async (appointmentData) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const token = localStorage.getItem('token'); // Get JWT token stored on login
      if (!token) {
        setErrorMessage('Please login before booking an appointment.');
        setLoading(false);
        return;
      }
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(appointmentData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to book appointment.');
      } else {
        setBookingSuccess(true);
        setBookedDoctor(selectedDoctor); 
        setSelectedDoctor(null);
      }
    } catch (err) {
      setErrorMessage('Unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinDemo = () => {
    if (bookedDoctor) {
      navigate('/demo-consultation', { state: { doctor: bookedDoctor } });
    }
  };

  const handleCloseSnackbar = () => {
    setBookingSuccess(false);
    setErrorMessage('');
  };

  return (
    <Container sx={{ mt: 4, minHeight: 450 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Book an Appointment
        </Typography>
        {!selectedDoctor ? (
          <DoctorList onBook={handleBookClick} />
        ) : (
          <AppointmentForm doctor={selectedDoctor} onSubmit={handleAppointmentSubmit} loading={loading} />
        )}

        {bookingSuccess && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="success" sx={{ mb: 1 }}>
              Appointment booked successfully!
            </Alert>
            <Button variant="contained" color="primary" onClick={handleJoinDemo}>
              Join Demo Consultation
            </Button>
          </Box>
        )}

        <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default BookAppointmentPage;
