import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DoctorList from '../components/DoctorList';
import AppointmentForm from '../components/AppointmentForm';

const BookAppointmentPage = () => {
  const location = useLocation();
  const passedDoctor = location.state?.doctor || null;
  const [selectedDoctor, setSelectedDoctor] = useState(passedDoctor);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (passedDoctor) setSelectedDoctor(passedDoctor);
  }, [passedDoctor]);

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingSuccess(false);
  };

  const handleAppointmentSubmit = async (appointmentData) => {
    try {
      // Include patient ID (from auth context) here
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });
      if (res.ok) {
        setBookingSuccess(true);
        setSelectedDoctor(null);
      }
    } catch (err) {
      alert('Failed to book appointment');
      console.error(err);
    }
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
          <AppointmentForm doctor={selectedDoctor} onSubmit={handleAppointmentSubmit} />
        )}
        {bookingSuccess && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Appointment booked successfully!
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default BookAppointmentPage;
