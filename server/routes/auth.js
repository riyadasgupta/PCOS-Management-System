const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Valid email required').isEmail(),
  check('password', 'Password of min 6 chars required').isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if(user)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    user = new User({
      name, email, password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  check('email', 'Valid email required').isEmail(),
  check('password', 'Password required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if(!user)
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if(err) throw err;
      res.json({ token });
    });
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/auth/user
// @desc    Get authenticated user details
// @access  Private
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
