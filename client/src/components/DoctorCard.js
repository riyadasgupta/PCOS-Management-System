import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const DoctorCard = ({ doctor, onBook }) => (
  <Card sx={{ maxWidth: 400, m: 1 }}>
    <CardContent>
      <Typography variant="h6">{doctor.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">{doctor.specialty}</Typography>
      <Typography variant="body2">{doctor.qualifications}</Typography>
      <Typography variant="body2">Experience: {doctor.experienceYears} years</Typography>
      <Typography variant="body2">Fee: ${doctor.consultationFee}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {doctor.bio}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => onBook(doctor)}
      >
        Book Appointment
      </Button>
    </CardContent>
  </Card>
);

export default DoctorCard;
