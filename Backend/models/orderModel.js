const db= require("../config/connect_DB");

const createOrder= async(orderData)=>{
  const sql=' INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
  const [result]= await db.execute(sql,[userId,totalAmount]);
  return result.insertId;
}
const getUserOrders=async(userId)=>{
  const sql ='SELECT * FROM orders WHEN user_id= ?';
  const [rows]= await db.execute(sql, [userId]);
  return rows;
};

const getOrderById=async(orderId)=>{
  const sql='SELECT * FROM orders WHERE id= ?';
  const [rows]= await db.execute(sql, [orderId]);
  return rows[0];
};

const updateOrderStatus=async(orderId, status)=>{
  const sql='UPDATE orders SET status= ? WHERE id= ?';
  const [result]= await db.execute(sql, [status, orderId]);
  return result.affectedRows > 0;
};

const deleteOrder=async(orderId)=>{
  const sql='DELETE FROM orders WHERE id= ?';
  const [result]= await db.execute(sql, [orderId]);
  return result.affectedRows > 0;
};
const getAllOrders=async(userId)=>{
  const sql = 'SELECT * FROM orders WHERE user_id = ?';
  const [rows] = await db.execute(sql, [userId]);
  return rows;
}

module.exports={
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getAllOrders
};