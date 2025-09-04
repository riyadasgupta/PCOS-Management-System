import React from "react";
import { Container, Typography, Card, CardContent, Avatar, Box, Button } from "@mui/material";

const user = {
  name: "Your Name",
  email: "your@email.com",
  age: 25,
  weight: 60,
  height: 163,
  avatar: "", // Optionally add URL to profile photo or leave blank for initial letter
};

const ProfilePage = () => (
  <Box sx={{ minHeight: "70vh", background: "#F5F8FE", py: 8 }}>
    <Container maxWidth="sm">
      <Card sx={{
        maxWidth: 420, mx: "auto", borderRadius: 3, boxShadow: 3,
        textAlign: "center", py: 4, px: 2,
      }}>
        <Avatar sx={{ bgcolor: "#2596be", m: "0 auto", width: 72, height: 72, fontSize: 38 }}>
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" style={{ width: "100%" }} />
          ) : (
            user.name ? user.name[0].toUpperCase() : "A"
          )}
        </Avatar>
        <CardContent>
          <Typography variant="h6" sx={{ mt: 2, mb: 0.5 }}>
            {user.name}
          </Typography>
          <Typography color="text.secondary" variant="body1" sx={{ mb: 2 }}>
            {user.email}
          </Typography>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="body2"><b>Age:</b> {user.age}</Typography>
            <Typography variant="body2"><b>Weight:</b> {user.weight} kg</Typography>
            <Typography variant="body2"><b>Height:</b> {user.height} cm</Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ background: "#2596be", px: 4, mt: 1, fontWeight: 600 }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </Container>
  </Box>
);

export default ProfilePage;
