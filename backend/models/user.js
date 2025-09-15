const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async create(name, email, address, password, role) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [result] = await pool.query(
      'INSERT INTO Users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, address, hashedPassword, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
  },

  async findByLoginIdentifier(loginIdentifier) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [loginIdentifier]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = User;
