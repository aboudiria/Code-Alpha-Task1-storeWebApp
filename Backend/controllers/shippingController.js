const ShippingInfo = require('../models/shippingModel');
const Order = require('../models/orderModel');
const CartItem = require('../models/cartItemModel');
const OrderItem = require('../models/orderItemModel');

const getShippingByOrderId= async(req,res)=>{
    try {
        const orderId = req.params.id;
        const userId = req.user.id;
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        if (req.user.role !== 'user' && req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Forbidden: Only users or admins can access shipping info' });
        }

    
        const order = await Order.getOrderById(orderId);
    
        if (!order) {
          return res.status(404).json({ message: 'Order not found.' });
        }
    
        if (order.user_id !== userId && req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied.' });
        }
    
        const shipping = await ShippingInfo.getShippingByOrderId(orderId);
    
        if (!shipping) {
          return res.status(404).json({ message: 'Shipping info not found.' });
        }
    
        res.status(200).json(shipping);
      } catch (error) {
        console.error('Get Shipping Info Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const updateShippingDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id;
        const updatedData = req.body;
    
        const order = await Order.getOrderById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found.' });
    
        if (order.user_id !== userId && req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied.' });
        }
    
        const updated = await ShippingInfo.updateShippingInfo(orderId, updatedData);
        res.status(200).json({ message: 'Shipping info updated successfully.', updated });
      } catch (error) {
        console.error('Update Shipping Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
};
const getAllShippingInfo = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Admin access required.' });
        }
        const allShipping = await ShippingInfo.getAllShippingInfo();
        res.status(200).json(allShipping);
      } catch (error) {
        console.error('Get All Shipping Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
};
const deleteShippingDetails=async(req,res)=>{
    try {
        const orderId = req.params.id;
        const userId = req.user.id;
    
        const order = await Order.getOrderById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found.' });
    
        if (order.user_id !== userId && req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied.' });
        }
    
        await ShippingInfo.deleteShippingDetails(orderId);
        res.status(200).json({ message: 'Shipping details deleted successfully.' });
      } catch (error) {
        console.error('Delete Shipping Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
}
const addShippingDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id;
        const shippingData = req.body;

        const order = await Order.getOrderById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found.' });

        if (order.user_id !== userId && req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied.' });
        }

        const shippingId = await ShippingInfo.addShippingDetails(orderId, shippingData);
        res.status(201).json({ message: 'Shipping details added successfully.', shippingId });
    } catch (error) {
        console.error('Add Shipping Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    getShippingByOrderId,
    updateShippingDetails,
    getAllShippingInfo,
    deleteShippingDetails,
    addShippingDetails
};