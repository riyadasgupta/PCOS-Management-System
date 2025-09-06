const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const patientId = req.user.id; // from auth middleware
    const { doctorId, appointmentDate, symptoms } = req.body;

    if (!doctorId || !appointmentDate) {
      return res.status(400).json({ error: 'doctorId and appointmentDate are required' });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate,
      symptoms,
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error booking appointment' });
  }
});

module.exports = router;
