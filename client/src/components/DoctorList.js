import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import DoctorCard from './DoctorCard';

const DoctorList = ({ onBook }) => {
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('/api/doctors');
        const data = await res.json();
        setDoctors(data);
      } catch {
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  if (doctors === null) return <CircularProgress />;
  if (doctors.length === 0)
    return <Typography color="text.secondary">No doctors available at the moment.</Typography>;

  return (
    <Grid container spacing={2}>
      {doctors.map((doc) => (
        <Grid item xs={12} md={4} key={doc._id}>
          <DoctorCard doctor={doc} onBook={onBook} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DoctorList;
