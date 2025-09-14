const pool = require('../config/db');

const Store = {
  async create(name, email, address, owner_id) {
    const [result] = await pool.query(
      'INSERT INTO Stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
      [name, email, address, owner_id]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.query('SELECT * FROM Stores');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM Stores WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Store;
