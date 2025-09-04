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
const usersRoutes = require('./routes/users');          // not 'users'
const doctorsRoutes = require('./routes/doctors');      // not 'doctors'
const appointmentsRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');



// Use routes
app.use('/api/users', usersRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
