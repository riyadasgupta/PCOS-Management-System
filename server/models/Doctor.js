const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  qualifications: String,
  experienceYears: Number,
  location: String,
  consultationFee: Number,
  availableSlots: [Date],  
  contactEmail: String,
  phone: String,
  bio: String,
  available: { type: Boolean, default: true }  
});

module.exports = mongoose.model('Doctor', DoctorSchema);
