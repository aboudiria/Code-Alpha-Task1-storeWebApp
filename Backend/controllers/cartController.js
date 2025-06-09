const cartItem= require('../models/cartItemModel');
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const ShippingInfo = require('../models/shippingInfoModel');

const addToCart=async(req,res)=>{
    try {
        const userId = req.user.id;
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        if (req.user.role !== 'user') {
          return res.status(403).json({ message: 'Forbidden: Only users can add items to cart' });
        }

        const { productId, quantity } = req.body;
    
        if (!productId || !quantity || quantity <= 0) {
          return res.status(400).json({ message: 'Invalid product ID or quantity.' });
        }
        await CartItem.addToCart(userId, productId, quantity);
        res.status(200).json({ message: 'Item added to cart.' });
      } catch (error) {
        console.error('Add to Cart Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const getCartItems=async(req,res)=>{
    try {
        const userId = req.user.id;
        const items = await CartItem.getCartItems(userId);
        res.status(200).json(items);
      } catch (error) {
        console.error('Get Cart Items Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
}
const clearCart=async(req,res)=>{
    try {
        const userId = req.user.id;
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        if (req.user.role !== 'user') {
          return res.status(403).json({ message: 'Forbidden: Only users can clear their cart' });
        }
        await CartItem.clearCart(userId);
        res.status(200).json({ message: 'Cart cleared successfully.' });
      } catch (error) {
        console.error('Clear Cart Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
}