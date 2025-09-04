const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST /api/appointments - create appointment
router.post('/', async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, symptoms } = req.body;
    if (!patientId || !doctorId || !appointmentDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate,
      symptoms,
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ error: 'Server error creating appointment' });
  }
});

// GET /api/appointments?patientId=... - fetch user appointments
router.get('/', async (req, res) => {
  try {
    const { patientId } = req.query;
    if (!patientId) return res.status(400).json({ error: 'patientId is required' });
    const appointments = await Appointment.find({ patientId }).populate('doctorId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching appointments' });
  }
});

module.exports = router;
