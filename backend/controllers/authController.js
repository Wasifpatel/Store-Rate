const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, address, password, role } = req.body;

  try {
    let user = await User.findByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User with that email already exists' });
    }

    const userId = await User.create(name, email, address, password, role);

    const payload = { user: { id: userId, role: role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getEmail = async (req, res) => {
  const { loginIdentifier } = req.body;

  try {
    const user = await User.findByLoginIdentifier(loginIdentifier);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ email: user.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
