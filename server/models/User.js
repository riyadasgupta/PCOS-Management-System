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
  dosage: { type: String, required: false },     // Not required
  startDate: { type: Date, required: false }     // Not required
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // removed required:true
  age: Number,
  weight: Number,
  height: Number,
  symptoms: [String],
  medications: [MedicationSchema],               // Each medication validated by new schema
  dietPreferences: [String],
  workoutRoutine: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
