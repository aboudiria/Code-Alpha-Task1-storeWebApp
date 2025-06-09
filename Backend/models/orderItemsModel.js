const db = require('../config/connect_DB');

const addOrderItem = async (orderItemData) => {
  const { orderId, productId, quantity, price } = orderItemData;
  const sql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
  const [result] = await db.execute(sql, [orderId, productId, quantity, price]);
  return result.insertId;
};

const getItemsByOrderId = async (orderId) => {
  const sql = 'SELECT * FROM order_items WHERE order_id = ?';
  const [rows] = await db.execute(sql, [orderId]);
  return rows;
};

// Admin-only: get all order items
const getAllOrderItems = async () => {
  const sql = 'SELECT * FROM order_items';
  const [rows] = await db.execute(sql);
  return rows;
};

module.exports = {
  addOrderItem,
  getItemsByOrderId,
  getAllOrderItems
};
