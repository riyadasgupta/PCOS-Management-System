import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, MenuItem } from '@mui/material';

const formatLocalDateTime = (isoDateStr) => {
  const date = new Date(isoDateStr);
  return date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
};

const AppointmentForm = ({ doctor, onSubmit, loading }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedSlot.trim()) {
      setError('Please select an appointment slot.');
      return;
    }

    const symptomsArray = symptoms
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSubmit({
      doctorId: doctor._id,
      appointmentDate: new Date(selectedSlot).toISOString(),
      symptoms: symptomsArray,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Booking Appointment with Dr. {doctor.name} ({doctor.specialty})
      </Typography>

      <TextField
        select
        label="Select Appointment Slot"
        fullWidth
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value.trim())}
        required
        error={Boolean(error)}
        helperText={error}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {(doctor.availableSlots || []).map((slot) => (
          <MenuItem key={slot} value={slot}>
            {formatLocalDateTime(slot)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Symptoms (comma separated)"
        placeholder="e.g. irregular periods, fatigue"
        fullWidth
        multiline
        minRows={3}
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        sx={{ mb: 2 }}
        disabled={loading}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </Button>
    </Box>
  );
};

export default AppointmentForm;
