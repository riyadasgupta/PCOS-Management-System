import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useSpecialty } from "../contexts/SpecialtyContext";
import { useNavigate } from "react-router-dom";

const doctors = [
  { name: "Dr. Seema Patel", specialty: "Gynecologist", available: true },
  { name: "Dr. Aman Sinha", specialty: "Endocrinologist", available: false },
  { name: "Dr. Rohit Nair", specialty: "Nutritionist", available: true },
  // ... other doctors
];

const ConsultDoctorPage = () => {
  const { selectedSpecialty, clearSpecialty } = useSpecialty();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doc) => doc.specialty === selectedSpecialty)
    : doctors;

  useEffect(() => {
    setLoading(true);
    const loadingTimer = setTimeout(() => setLoading(false), 700); // Simulate loading
    return () => clearTimeout(loadingTimer);
  }, [selectedSpecialty]);

  const handleBookAppointment = (doctor) => {
    // Pass doctor info to booking page via route state
    navigate("/book-appointment", { state: { doctor } });
  };

  return (
    <Box sx={{ minHeight: "70vh", background: "#F5F8FE", py: 6 }}>
      <Container>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="h5" color="#2596be" sx={{ fontWeight: 600 }}>
            Book a Doctor Consultation
          </Typography>
          {selectedSpecialty && (
            <Button variant="outlined" onClick={clearSpecialty}>
              Clear Filter ({selectedSpecialty})
            </Button>
          )}
        </Stack>
        {loading ? (
          <Box
            sx={{
              minHeight: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : filteredDoctors.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
            No doctors available for this specialization.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center" alignItems="stretch" mt={2}>
            {filteredDoctors.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.name}>
                <Card
                  elevation={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    py: 4,
                    px: 2,
                    borderRadius: 3,
                    minHeight: 280,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#2596be", width: 64, height: 64, mb: 2 }}>
                    <LocalHospitalIcon fontSize="large" />
                  </Avatar>
                  <CardContent sx={{ textAlign: "center", flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                      {doc.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      {doc.specialty}
                    </Typography>
                    {doc.available ? (
                      <Button
                        variant="contained"
                        sx={{ background: "#2596be" }}
                        onClick={() => handleBookAppointment(doc)}
                      >
                        Book Appointment
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        disabled
                        sx={{ background: "#cfd8dc", color: "#607d8b" }}
                      >
                        Unavailable
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ConsultDoctorPage;
