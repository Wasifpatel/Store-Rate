const pool = require('../config/db');

const Rating = {
  async create(user_id, store_id, rating) {
    const [result] = await pool.query(
      'INSERT INTO Ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
      [user_id, store_id, rating]
    );
    return result.insertId;
  },

  async findByStoreId(store_id) {
    const [rows] = await pool.query('SELECT * FROM Ratings WHERE store_id = ?', [store_id]);
    return rows;
  },

  async getAverageRating(store_id) {
    const [rows] = await pool.query('SELECT AVG(rating) as averageRating FROM Ratings WHERE store_id = ?', [store_id]);
    return rows[0].averageRating;
  }
};

module.exports = Rating;
