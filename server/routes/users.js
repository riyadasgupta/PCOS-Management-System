const express = require('express');
const router = express.Router();
const User = require('../models/User'); // import your Mongoose User model

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords from response
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server error fetching users' });
  }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      weight,
      height,
      symptoms,
      medications,
      dietPreferences,
      workoutRoutine
    } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password, // hash password in your model pre-save hook or here before saving
      age,
      weight,
      height,
      symptoms,
      medications,
      dietPreferences,
      workoutRoutine,
    });

    await newUser.save();
    // Exclude password from returned user
    const userObj = newUser.toObject();
    delete userObj.password;
    res.status(201).json({ message: 'User created', user: userObj });
  } catch (err) {
    console.error('Error creating user:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error creating user' });
  }
});

module.exports = router;
