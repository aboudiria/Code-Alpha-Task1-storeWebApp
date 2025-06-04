const db= require('../config/connect_DB');
const bcrypt = require('bcrypt');


// ✅ Get all users
const getAllUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

//  Create a new user
const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

//  Login user & check role
const loginUser = async (email, password) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      throw new Error('User not found');
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
 
    if (user.role === 'admin') {
      console.log('Logged in as admin');
    } else if (user.role === 'user') {
      console.log('Logged in as user');
    }

    return user; // return user in all cases
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
// delete a user from db by admin
const deleteUserByAdmin = async (userId) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  deleteUserByAdmin
};
