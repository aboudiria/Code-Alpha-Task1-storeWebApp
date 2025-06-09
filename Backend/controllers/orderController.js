const User= require("../models/userModel");
const CartItem = require("../models/cartItemModel");
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const ShippingInfo = require("../models/shippingInfoModel");


const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(userId.role !== 'user') {
            return res.status(403).json({ message: 'Forbidden: Only users can place orders' });
        }

        const cartItems = await CartItem.getCartItems(userId);
    
        if (cartItems.length === 0) {
          return res.status(400).json({ message: 'Cart is empty' });
        }
    
        let totalAmount = 0;
        cartItems.forEach(item => {
          totalAmount += item.price * item.quantity;
        });
    
        const orderId = await Order.createOrder(userId, totalAmount);
    
        for (const item of cartItems) {
          await OrderItem.addOrderItem(orderId, item.product_id, item.quantity, item.price);
        }
    
        await ShippingInfo.addShippingInfo(orderId, req.body.shipping);
    
        await CartItem.clearCart(userId);
    
        res.status(201).json({ message: 'Order placed successfully', orderId });
      } catch (error) {
        console.error('Create Order Error:', error.message);
        res.status(500).json({ message: 'Server error' });
      }
};
const getUserOrders= async(req,res)=>{
    try {
        const userId = req.user.id;
        if(userId.role !=='admin'){
            return res.status(403).json({ message: 'Forbidden: Only admins can access this resource' });
        }
        const orders = await Order.getUserOrders(userId);
        res.status(200).json(orders);
      } catch (error) {
        console.error('Get Orders Error:', error.message);
        res.status(500).json({ message: 'Server error' });
      }
}
const getOrderDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(userId.role !== 'user') {
            return res.status(403).json({ message: 'Forbidden: Only users can view order details' });
        }
        const orderId = req.params.id;
        const order = await Order.getOrderById(orderId);
        const items = await OrderItem.getItemsByOrderId(orderId);
        const shipping = await ShippingInfo.getShippingByOrderId(orderId);
        res.status(200).json({ order, items, shipping });
      } catch (error) {
        console.error('Order Details Error:', error.message);
        res.status(500).json({ message: 'Server error' });
      }
};

const updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      await Order.updateOrderStatus(req.params.id, status);
      res.status(200).json({ message: 'Order status updated' });
    } catch (error) {
      console.error('Update Status Error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
const deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if(userId.role !== 'user') {
            return res.status(403).json({ message: 'Forbidden: Only users can delete their orders' });
        }
        const order = await Order.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
            }
        if (order.user_id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own orders' });
        }

      await Order.deleteOrder(orderId);
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Delete Order Error:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
const getAllOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        if(userId.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Only admins can access this resource' });
        }
        const orders = await Order.getAllOrders(userId);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Get All Orders Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    createOrder,
    getUserOrders,
    getOrderDetails,
    updateOrderStatus,
    deleteOrder,
    getAllOrders
};
