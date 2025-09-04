import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const AppointmentForm = ({ doctor, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      doctorId: doctor._id,
      appointmentDate: selectedDate,
      symptoms: symptoms.split(',').map(s => s.trim()),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mt: 2 }}>
      <Typography variant="h6">Book Appointment with Dr. {doctor.name}</Typography>
      <TextField
        label="Select Date & Time"
        type="datetime-local"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Symptoms (comma-separated)"
        value={symptoms}
        onChange={e => setSymptoms(e.target.value)}
        multiline
        rows={3}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Confirm Appointment
      </Button>
    </Box>
  );
};

export default AppointmentForm;
