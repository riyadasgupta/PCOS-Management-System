import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, MenuItem, Button, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const medicationOptions = [
  'Not Applicable',   
  'Metformin',
  'Spironolactone',
  'Clomiphene',
  'Letrozole',
  'Progesterone',
  'Other',
];

const MedicationInput = ({ medications, setMedications }) => {
  useEffect(() => {
    if (medications.length === 0) {
      setMedications([{ name: '', dosage: '', startDate: '' }]);
    }
  }, [medications, setMedications]);

  // Check if 'Not Applicable' is selected anywhere
  const isNotApplicableSelected = medications.some(med => med.name === 'Not Applicable');

  const handleMedicationChange = (index, field, value) => {
    // If changing name to 'Not Applicable', reset others to empty
    if (field === 'name' && value === 'Not Applicable') {
      setMedications([{ name: 'Not Applicable', dosage: '', startDate: '' }]);
      return;
    }

    const updatedMedications = medications.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updatedMedications);
  };

  const addMedication = () => {
    if (isNotApplicableSelected) return; // disable add if Not Applicable selected
    setMedications([...medications, { name: '', dosage: '', startDate: '' }]);
  };

  const removeMedication = (index) => {
    // Allow removal even if Not Applicable is selected, but clear if no inputs remain
    const updatedMedications = medications.filter((_, i) => i !== index);
    if (updatedMedications.length === 0) {
      setMedications([{ name: '', dosage: '', startDate: '' }]);
    } else {
      setMedications(updatedMedications);
    }
  };

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Current Medications
      </Typography>
      {medications.map((med, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <TextField
            select
            label="Medication Name"
            value={med.name}
            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
            sx={{ flex: 2 }}
          >
            {medicationOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Dosage"
            placeholder="e.g. 500mg daily"
            value={med.dosage}
            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
            sx={{ flex: 2 }}
            disabled={med.name === 'Not Applicable'}
          />
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={med.startDate}
            onChange={(e) => handleMedicationChange(index, 'startDate', e.target.value)}
            sx={{ flex: 1.5 }}
            disabled={med.name === 'Not Applicable'}
          />
          <IconButton
            onClick={() => removeMedication(index)}
            color="error"
            aria-label="remove medication"
            sx={{ flex: '0 0 auto' }}
          >
            <RemoveCircleOutline />
          </IconButton>
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        onClick={addMedication}
        sx={{ mt: 1 }}
        disabled={isNotApplicableSelected}
      >
        Add Medication
      </Button>
    </Box>
  );
};

export default MedicationInput;
