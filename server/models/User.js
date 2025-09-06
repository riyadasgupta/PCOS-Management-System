const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      'Not Applicable',
      'Metformin',
      'Spironolactone',
      'Clomiphene',
      'Letrozole',
      'Progesterone',
      'Other'
    ],
    required: true
  },
  dosage: { type: String, required: false },     
  startDate: { type: Date, required: false }     
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  weight: Number,
  height: Number,
  symptoms: [String],
  medications: [MedicationSchema],               
  dietPreferences: [String],
  workoutRoutine: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
