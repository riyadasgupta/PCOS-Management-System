// import React, { useState } from 'react';
// import { Box, TextField, Button, Typography } from '@mui/material';

// const AppointmentForm = ({ doctor, onSubmit }) => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [symptoms, setSymptoms] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       doctorId: doctor._id,
//       appointmentDate: selectedDate,
//       symptoms: symptoms.split(',').map(s => s.trim()),
//     });
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mt: 2 }}>
//       <Typography variant="h6">Book Appointment with Dr. {doctor.name}</Typography>
//       <TextField
//         label="Select Date & Time"
//         type="datetime-local"
//         value={selectedDate}
//         onChange={e => setSelectedDate(e.target.value)}
//         InputLabelProps={{ shrink: true }}
//         fullWidth
//         required
//         sx={{ mt: 2 }}
//       />
//       <TextField
//         label="Symptoms (comma-separated)"
//         value={symptoms}
//         onChange={e => setSymptoms(e.target.value)}
//         multiline
//         rows={3}
//         fullWidth
//         sx={{ mt: 2 }}
//       />
//       <Button type="submit" variant="contained" sx={{ mt: 3 }}>
//         Confirm Appointment
//       </Button>
//     </Box>
//   );
// };

// export default AppointmentForm;





import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, MenuItem } from '@mui/material';

// Format ISO string to user-friendly local date/time string
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

      {/* Available Slots Dropdown */}
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
