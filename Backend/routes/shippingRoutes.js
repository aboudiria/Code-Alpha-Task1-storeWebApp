const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');
const protectRoute = require('../middlewares/protectRoute');
const protectAdminRoute= require('../middlewares/protectAdminRoute')

// Get shipping info for a specific order (user or admin)
router.get('/:id', protectRoute, shippingController.getShippingByOrderId);

// Admin: Get all shipping info
router.get('/', protectAdminRoute, shippingController.getAllShippingInfo);

// Update shipping info for a specific order (user or admin)
router.put('/:id', protectRoute, shippingController.updateShippingDetails);

module.exports = router;
