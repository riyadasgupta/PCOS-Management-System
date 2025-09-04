import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FemaleIcon from '@mui/icons-material/Female';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useSpecialty } from '../contexts/SpecialtyContext';

const specializations = [
  {
    title: 'Gynecologist',
    icon: <FemaleIcon fontSize="large" sx={{ color: "#2596be" }} />,
    desc: 'Expert in women\'s reproductive health and PCOS.'
  },
  {
    title: 'Endocrinologist',
    icon: <PsychologyIcon fontSize="large" sx={{ color: "#2596be" }} />,
    desc: 'Manages hormones and metabolic health.'
  },
  {
    title: 'Nutritionist',
    icon: <RestaurantIcon fontSize="large" sx={{ color: "#2596be" }} />,
    desc: 'Guides nutrition and dietary plans for wellness.'
  },
  {
    title: 'Fitness Trainer',
    icon: <FitnessCenterIcon fontSize="large" sx={{ color: "#2596be" }} />,
    desc: 'Helps build workout routines for PCOS.'
  },
  {
    title: 'Cardiologist',
    icon: <FavoriteIcon fontSize="large" sx={{ color: "#2596be" }} />,
    desc: 'Specializes in heart health and blood pressure.'
  },
];

const SpecializationsGrid = ({ onSpecializationSelect }) => {
  const { selectedSpecialty } = useSpecialty();

  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant="h6" align="center" mb={3} color="#2596be">
        Find by Specialization
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {specializations.map(spec => {
          const selected = selectedSpecialty === spec.title;
          return (
            <Grid item xs={6} sm={4} md={2} key={spec.title}>
              <Tooltip title={spec.desc} placement="top" arrow>
                <Card
                  elevation={selected ? 10 : 2}
                  sx={{
                    border: selected ? "3px solid #2596be" : "1.5px solid #e0e0e0",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "0.23s",
                    backgroundColor: selected ? "#e3f3fa" : undefined,
                    "&:hover": {
                      boxShadow: 6,
                      transform: "scale(1.07)",
                    },
                  }}
                  onClick={() => onSpecializationSelect && onSpecializationSelect(spec.title)}
                >
                  <CardContent>
                    {spec.icon}
                    <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 1 }}>
                      {spec.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SpecializationsGrid;
