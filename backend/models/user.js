const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async create(username, name, email, address, password, role) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [result] = await pool.query(
      'INSERT INTO Users (username, name, email, address, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [username, name, email, address, hashedPassword, role]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
  },

  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    return rows[0];
  },

  async findByLoginIdentifier(loginIdentifier) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE email = ? OR username = ?', [loginIdentifier, loginIdentifier]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = User;
