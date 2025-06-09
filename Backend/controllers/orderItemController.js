const OrderItem = require('../models/orderItemModel');
const Order = require('../models/orderModel');

exports.getOrderItemsByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user.id;

    // Get order to validate ownership
    const order = await Order.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Only owner or admin can view order items
    if (order.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const items = await OrderItem.getItemsByOrderId(orderId);
    res.status(200).json(items);
  } catch (error) {
    console.error('Get Order Items Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllOrderItems = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only.' });
    }

    const allItems = await OrderItem.getAllOrderItems();
    res.status(200).json(allItems);
  } catch (error) {
    console.error('Get All Order Items Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

