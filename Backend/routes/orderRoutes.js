const express= require('express');
const router= express.Router();
const orderController= require('../controllers/orderController');
const protectRoute= require('../middlewares/protectRoute');
const protectAdminRoute= require('../middlewares/protectAdminRoute');

// Route to create a new order
router.post('/', protectRoute, orderController.createOrder);
// Get all orders for the logged-in user
router.get('/', protectRoute, orderController.getUserOrders);
// Get order details by ID
router.get('/:id', protectRoute, orderController.getOrderDetails);
// Admin: Update order status
router.put('/:id/status', protectAdminRoute, orderController.updateOrderStatus);
// Admin: Get all orders
router.get('/', protectAdminRoute, orderController.getAllOrders);

module.exports=router;