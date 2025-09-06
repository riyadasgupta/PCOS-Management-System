const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// GET: Logged-in user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('GET /me error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT: Update logged-in user profile
router.put('/me', auth, async (req, res) => {
  const { name, email, age, weight, height } = req.body;
  try {
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) updateFields.email = email;
    if (age !== undefined) updateFields.age = age;
    if (weight !== undefined) updateFields.weight = weight;
    if (height !== undefined) updateFields.height = height;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('PUT /me error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

