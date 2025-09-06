import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField, List, ListItem, ListItemText } from '@mui/material';

const doctorResponses = [
  "Hello, I am Dr. {doctorName}. How are you feeling today?",
  "Can you please tell me more about your symptoms?",
  "Have you noticed any changes in your health recently?",
  "Are you currently taking any medications or supplements?",
  "I recommend you to stay hydrated and maintain a balanced diet.",
  "Please schedule a follow-up appointment in two weeks.",
  "Feel free to ask any questions or concerns you have!",
  "Thank you for sharing. I will guide you through the next steps."
];

const DemoConsultation = ({ doctor, onEnd }) => {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'doctor', text: `Hello, I am Dr. ${doctor.name}. How are you feeling today?` },
  ]);
  const [input, setInput] = useState([]);
  const [responseIndex, setResponseIndex] = useState(0);

  useEffect(() => {
    if (chatMessages.length > 1 && chatMessages[chatMessages.length - 1].sender === 'user') {
      // Show next doctor response after user message
      if (responseIndex < doctorResponses.length - 1) {
        const timer = setTimeout(() => {
          const nextResponse = doctorResponses[responseIndex + 1].replace("{doctorName}", doctor.name);
          setChatMessages((msgs) => [...msgs, { sender: 'doctor', text: nextResponse }]);
          setResponseIndex((i) => i + 1);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [chatMessages, responseIndex, doctor.name]);

  const handleSend = () => {
    if (!input.trim()) return;
    setChatMessages([...chatMessages, { sender: 'user', text: input.trim() }]);
    setInput('');
  };

  return (
    <Paper sx={{ maxWidth: 600, margin: 'auto', p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Demo Consultation with Dr. {doctor.name} ({doctor.specialty})
      </Typography>
      <Box sx={{
        border: 1, borderColor: 'grey.300', borderRadius: 1, height: 300, overflowY: 'auto', p: 2, mb: 2, bgcolor: '#f9f9f9'
      }}>
        <List>
          {chatMessages.map((msg, idx) => (
            <ListItem key={idx} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper sx={{
                p: 1, bgcolor: msg.sender === 'user' ? '#1976d2' : '#e0e0e0',
                color: msg.sender === 'user' ? 'white' : 'black', maxWidth: '70%',
              }}>
                <ListItemText primary={msg.text} />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <Button variant="contained" onClick={handleSend}>Send</Button>
      </Box>
      <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={onEnd}>
        End Consultation
      </Button>
    </Paper>
  );
};

export default DemoConsultation;
