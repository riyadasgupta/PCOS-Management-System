import React, { useState } from 'react';
import { TextField, Button, Stack, Paper, Typography, Chip, Autocomplete, Grid } from '@mui/material';
import axios from 'axios';
import MedicationInput from './MedicationInput';  

const symptomOptions = [
  "Irregular periods",
  "Acne",
  "Weight gain",
  "Mood swings",
  "Hair thinning",
  "Fatigue"
];

const dietOptions = [
  "Vegetarian",
  "Vegan",
  "Low-carb",
  "Gluten-free",
  "Dairy-free",
  "Balanced diet"
];

const workoutOptions = [
  "Yoga",
  "Walking",
  "Running",
  "Swimming",
  "Strength training",
  "HIIT"
];

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    symptoms: [],
    medications: [],
    dietPreferences: [],
    workoutRoutine: [],
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users`, dataToSend);
      alert('User saved successfully!');
      setFormData({
        name: '',
        email: '',
        age: '',
        weight: '',
        height: '',
        symptoms: [],
        medications: [],
        dietPreferences: [],
        workoutRoutine: [],
      });
    } catch (error) {
      alert('Error saving user');
      console.error(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6" color="#2596be" marginBottom={2}>
        Register Patient
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            required fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            required fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={e => handleChange('age', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="weight"
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={e => handleChange('weight', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="height"
                label="Height (cm)"
                type="number"
                value={formData.height}
                onChange={e => handleChange('height', e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>

          <Autocomplete
            multiple
            options={symptomOptions}
            value={formData.symptoms}
            onChange={(e, val) => handleChange('symptoms', val)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={index} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Symptoms" margin="normal" fullWidth />
            )}
          />

          <MedicationInput
            medications={formData.medications}
            setMedications={val => handleChange('medications', val)}
          />

          <Autocomplete
            multiple
            options={dietOptions}
            value={formData.dietPreferences}
            onChange={(e, val) => handleChange('dietPreferences', val)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={index} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Diet Preferences" margin="normal" fullWidth />
            )}
          />

          <Autocomplete
            multiple
            options={workoutOptions}
            value={formData.workoutRoutine}
            onChange={(e, val) => handleChange('workoutRoutine', val)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} key={index} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Workout Routine" margin="normal" fullWidth />
            )}
          />

          <Button type="submit" variant="contained" sx={{ background: '#2596be', fontWeight: 600 }}>
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default UserForm;
