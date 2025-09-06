const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
require('dotenv').config();

const doctors = [
  {
    name: "Dr. Seema Patel",
    specialty: "Gynecologist",
    qualifications: "MD, OB/GYN",
    experienceYears: 12,
    location: "City Hospital",
    consultationFee: 3000,
    availableSlots: [
      "2025-09-15T10:00:00Z",
      "2025-09-17T14:00:00Z"
    ],
    contactEmail: "seema@hospital.com",
    phone: "1234567890",
    bio: "Expert in women's health and PCOS treatment.",
    available: true
  },
  {
    name: "Dr. Neelesh Sharma",
    specialty: "Endocrinologist",
    qualifications: "MD, Endocrinology",
    experienceYears: 10,
    location: "Glucose Care Clinic",
    consultationFee: 2800,
    availableSlots: [
      "2025-09-18T10:30:00Z",
      "2025-09-20T15:00:00Z"
    ],
    contactEmail: "neelesh@endoclinic.com",
    phone: "9123456780",
    bio: "Specializes in metabolic and hormonal disorders.",
    available: true
  },
  {
    name: "Dr. Sunita Mehta",
    specialty: "Nutritionist",
    qualifications: "MSc, Nutrition",
    experienceYears: 7,
    location: "NutriWell Center",
    consultationFee: 1200,
    availableSlots: [
      "2025-09-15T09:00:00Z"
    ],
    contactEmail: "sunita@nutriwell.com",
    phone: "9212345678",
    bio: "Expert in dietary management for hormonal issues.",
    available: true
  },
  {
    name: "Anjali Rao",
    specialty: "Fitness Trainer",
    qualifications: "Certified Fitness Instructor",
    experienceYears: 5,
    location: "FitZone Studio",
    consultationFee: 1000,
    availableSlots: [
      "2025-09-16T17:00:00Z",
      "2025-09-17T08:00:00Z"
    ],
    contactEmail: "anjali@fitzone.com",
    phone: "9933445566",
    bio: "Personalized fitness plans for PCOS patients.",
    available: false
  },
  {
    name: "Dr. Rajiv Sen",
    specialty: "Cardiologist",
    qualifications: "DNB, Cardiology",
    experienceYears: 15,
    location: "Heart Care Center",
    consultationFee: 3500,
    availableSlots: [],
    contactEmail: "rajiv@heartcare.com",
    phone: "9876501234",
    bio: "Expert in PCOS-related cardiac complications.",
    available: false
  }
];

async function seedDoctors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);
    console.log('Doctors seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Failed to seed doctors', error);
    process.exit(1);
  }
}

seedDoctors();
