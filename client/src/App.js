import React from 'react';
import { useAuth } from './components/AuthContext'; // Adjust path if needed
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SpecialtyProvider } from './contexts/SpecialtyContext';
import Home from './components/Home.js';
import ConsultDoctorPage from './pages/ConsultDoctorPage';
import ProfilePage from './pages/ProfilePage';
import LogoutButton from "./components/LogoutButton";
import PrivateRoute from "./components/PrivateRoute";
import BookAppointmentPage from './pages/BookAppointmentPage';
import DoctorCard from './components/DoctorCard';
import AppointmentForm from './components/AppointmentForm';
import DemoConsultationPage from './pages/DemoConsultationPage';

function App() {
  const { user } = useAuth();

  return (
    <SpecialtyProvider>
      <Router>
        <Box sx={{ backgroundColor: "#F5F8FE", minHeight: "100vh" }}>
          <AppBar position="static" sx={{ background: "linear-gradient(90deg, #2596be, #64b3f4)" }}>
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                <Box
                  component="img"
                  src="/logo-circle.png"
                  alt="Ovionix Logo"
                  sx={{ height: 80, width: "80", mr: 4, bgcolor: "white", borderRadius: 10 }}
                />
              </Typography>

              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/consult">
                Consult Doctor
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>

              {/* Only show LogoutButton if user is logged in */}
              {user && <LogoutButton />}
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/consult"
              element={
                <PrivateRoute>
                  <ConsultDoctorPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/book-appointment"
              element={
                <PrivateRoute>
                  <BookAppointmentPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/doctor-card"
              element={
                <PrivateRoute>
                  <DoctorCard />
                </PrivateRoute>
              }
            />
            <Route path="/demo-consultation" element={<DemoConsultationPage />} />
          </Routes>

          <Box sx={{ background: "#2596be", color: "white", mt: 6, p: 2, textAlign: 'center', borderRadius: "0 0 8px 8px" }}>
            &copy; 2025 PCOS Management System. All rights reserved.
          </Box>
        </Box>
      </Router>
    </SpecialtyProvider>
  );
}

export default App;
