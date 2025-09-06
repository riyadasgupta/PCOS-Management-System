import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const DoctorList = ({ onBook }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch('/api/doctor');
        const data = await res.json();
        console.log('Doctors fetched:', data); 
        setDoctors(data);
      } catch (err) {
        console.error('Failed to load doctors', err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  if (loading) return <Typography>Loading doctors...</Typography>;
  if (doctors.length === 0) return <Typography>No doctors available.</Typography>;

  return (
    <Paper sx={{ maxHeight: 400, overflow: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Available Specialized Doctors
      </Typography>
      <List>
        {doctors.map((doctor) => (
          <ListItem key={doctor._id} divider>
            <ListItemText
              primary={`${doctor.name} (${doctor.specialty})`}
              secondary={
                doctor.available
                  ? `Available | Experience: ${doctor.experienceYears || 'N/A'} years | Fee: ₹${doctor.consultationFee || '-'}`
                  : `Unavailable | Experience: ${doctor.experienceYears || 'N/A'} years | Fee: ₹${doctor.consultationFee || '-'}`
              }
            />
            <Button
              variant="contained"
              disabled={!doctor.available}
              onClick={() => doctor.available && onBook(doctor)}
              sx={{
                background: doctor.available ? "#2596be" : "#cfd8dc",
                color: doctor.available ? 'white' : "#607d8b"
              }}
            >
              {doctor.available ? "Book Appointment" : "Unavailable"}
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DoctorList;
