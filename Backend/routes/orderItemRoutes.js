const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');
const protectRoute=require('../middlewares/protectRoute');
const protectAdminRoute= require('../middlewares/protectAdminRoute');


router.get('/:orderId', protectRoute, orderItemController.getOrderItemsByOrderId); 
router.get('/', protectAdminRoute, orderItemController.getAllOrderItems); // admin only
