const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const protectRoute=require('../middlewares/protectRoute')

router.post('/add', protectRoute, cartController.addToCart);

router.get('/', protectRoute, cartController.getCartItems);

router.delete('/clear', protectRoute, cartController.clearCart);

module.exports = router;
