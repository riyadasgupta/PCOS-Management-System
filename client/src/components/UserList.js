import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Paper, Typography, Divider, Chip, Box } from '@mui/material';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, []);

  // Helper to display medications
  const renderMedications = (medications) => {
    if (!medications || medications.length === 0) return <i>None</i>;
    if (
      medications.length === 1 &&
      medications[0].name === "Not Applicable"
    ) {
      return <Chip label="Not Applicable" color="default" />;
    }
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {medications.map((med, idx) => (
          <Chip
            key={idx}
            label={
              med.name +
              (med.dosage ? ` (${med.dosage})` : '') +
              (med.startDate ? ` [${new Date(med.startDate).toLocaleDateString()}]` : "")
            }
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    );
  };

  // Helper to display arrays as chips
  const renderChips = (items, labelColor = "success") =>
    items && items.length > 0 ? (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {items.map((item, idx) => (
          <Chip key={idx} label={item} color={labelColor} variant="outlined" />
        ))}
      </Box>
    ) : (
      <i>None</i>
    );

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h6" color="#2596be" marginBottom={2}>
        Registered Patients
      </Typography>
      {users.length === 0 ? (
        <Typography variant="body2" color="text.secondary">No users found.</Typography>
      ) : (
        <List>
          {users.map(user => (
            <React.Fragment key={user._id}>
              <ListItem alignItems="flex-start" sx={{ flexDirection: "column", alignItems: "start" }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  <b>{user.name}</b> {" "}
                  <span style={{ color: "#6e6e6e", fontSize: 14 }}>
                    ({user.email})
                  </span>
                </Typography>
                <Typography variant="body2">
                  <span style={{ color: "#2596be" }}>Symptoms:</span>{' '}
                  {renderChips(user.symptoms, "error")}
                </Typography>
                <Typography variant="body2">
                  <span style={{ color: "#2596be" }}>Diet Preferences:</span>{' '}
                  {renderChips(user.dietPreferences, "warning")}
                </Typography>
                <Typography variant="body2">
                  <span style={{ color: "#2596be" }}>Workout Routine:</span>{' '}
                  {renderChips(user.workoutRoutine, "success")}
                </Typography>
                <Typography variant="body2">
                  <span style={{ color: "#2596be" }}>Medications:</span>{' '}
                  {renderMedications(user.medications)}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default UserList;
