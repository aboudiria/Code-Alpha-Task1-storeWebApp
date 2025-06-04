const order = require('../models/orderModel');
const user = require('../models/userModel');

const createOrder = async (req, res) => {
  try {
    const { total_amount, status } = req.body;
    const userId = req.user.id; 

    const allUsers = await user.getAllUsers(); 
    
    const userTryingToCreateOrder = allUsers.some(
      (u) => u.id === parseInt(userId)
    );

    if (!userTryingToCreateOrder) {
      return res.status(400).json({ message: "User not found. Please log in." });
    }

    const currentUser = allUsers.find(u => u.id === parseInt(userId));
    if (currentUser.role === "admin") {
      return res.status(401).json({ message: "Admin is not authorized to create an order." });
    }

    const orderData = {
      user_id: userId,
      total_amount,
      status: status || 'pending',
    };

    const newOrder = await order.createOrder(orderData);

    res.status(200).json({ message: "Successfully created an order", order: newOrder });

  } catch (error) {
    console.error("Error in creating order:", error);
    res.status(500).json({ error: "Error in creating order" });
  }
};
// Get Order by ID (user or admin)
const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const role = req.user.role;
  
      const orders = await order.getOrderById(id);
      if (!orders.length) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const orderData = orders[0];
  
      // Only admin or the owner can access
      if (orderData.user_id !== userId && role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
      }
  
      res.status(200).json(orderData);
  
    } catch (error) {
      console.error("Error getting order by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Get Orders by Logged-in User
  const getOrdersByUser = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await order.getOrderByUser(userId);
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error getting user orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
 // Admin: Get All Orders
const getAllOrders = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Only admin can view all orders" });
      }
  
      const orders = await order.getAllOrders();
      res.status(200).json(orders);
  
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // Admin: Update Order Status
  const updateOrderStatus = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Only admin can update order status" });
      }
  
      const { id } = req.params;
      const { status } = req.body;
  
      const updated = await order.updateOrderStatus(id, status);
      if (updated.affectedRows === 0) {
        return res.status(404).json({ message: "Order not found or status unchanged" });
      }
  
      res.status(200).json({ message: "Order status updated successfully" });
  
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus
  
};
