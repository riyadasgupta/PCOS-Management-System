const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const usersRouter = require('./routes/users');                 // Usually handles /api/users
const doctorRoutes = require('./routes/doctor');               // Handles /api/doctor
const appointmentsRoutes = require('./routes/appointments');   // Handles /api/appointments
const authRoutes = require('./routes/auth');                   // Handles /api/auth

// Use routes
app.use('/api/users', usersRouter);
app.use('/api/doctor', doctorRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/auth', authRoutes);


app.use('/api/user', require('./routes/api/user'));            
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
