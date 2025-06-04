const db = require('../config/connect_DB');

// Create an order
const createOrder = async (orderData) => {
  const { user_id, total_amount, status } = orderData;
  const sql = 'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)';
  const [result] = await db.query(sql, [user_id, total_amount, status]);
  return { id: result.insertId, ...orderData };
};

// Get order by ID
const getOrderById = async (id) => {
  const sql = 'SELECT * FROM orders WHERE id = ?';
  const [rows] = await db.query(sql, [id]);
  return rows;
};

// Get orders by user ID
const getOrderByUser = async (userId) => {
  const sql = 'SELECT * FROM orders WHERE user_id = ?';
  const [rows] = await db.query(sql, [userId]);
  return rows;
};

// Get all orders (admin only)
const getAllOrders = async () => {
   const sql = `
     SELECT 
       o.id AS order_id,
       o.user_id,
       u.name AS user_name,
       o.total_amount,
       o.status,
       o.created_at
     FROM orders o
     JOIN users u ON o.user_id = u.id
     ORDER BY o.created_at DESC
   `;
   const [rows] = await db.query(sql);
   return rows;
 };

 // Update order status
const updateOrderStatus = async (orderId, status) => {
   const sql = 'UPDATE orders SET status = ? WHERE id = ?';
   const [result] = await db.query(sql, [status, orderId]);
   return result;
 };
 

module.exports = {
  createOrder,
  getOrderById,
  getOrderByUser,
  getAllOrders
};
