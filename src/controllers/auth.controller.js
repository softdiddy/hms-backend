// src/controllers/auth.controller.js
const authService = require('../services/auth.service');
const bcrypt = require('bcrypt');

async function register(req, res) {
  const { name, email, password, role } = req.body;
  try {
    const user = await authService.createUser({ name, email, password, role });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ success: true, user });
}

module.exports = { register, login };
