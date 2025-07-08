const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Auto-create demo user on server start
(async () => {
  try {
    const existing = await User.findOne({ username: 'admin' });
    if (!existing) {
      const newUser = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: 'password123',
        name: 'Admin User',
        role: 'admin'
      });
      await newUser.save();
      console.log('✅ Demo admin user created');
    } else {
      console.log('ℹ️ Demo admin user already exists');
    }
  } catch (err) {
    console.error('❌ Error creating demo user:', err.message);
  }
})();

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      message: 'Login successful!',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
