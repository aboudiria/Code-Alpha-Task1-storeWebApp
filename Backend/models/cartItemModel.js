const db= require('../config/db');

const addToCart =async (userId, productId, quantity)=> {
    const [rows] = await db.execute(
      'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (rows.length > 0) {
      await db.execute(
        'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
    } else {
      await db.execute(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
    }
  }
  const getCartItems=async(userId)=>{
    const [items] = await db.execute(
        `SELECT ci.*, p.name, p.price, p.image_url 
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.id
         WHERE ci.user_id = ?`,
        [userId]
      );
      return items;
  };

  const clearCart=async(userId)=>{
    await db.execute(
        'DELETE FROM cart_items WHERE user_id = ?',
        [userId]
      );
    };

    module.exports={
        addToCart,
        getCartItems,
        clearCart
    }