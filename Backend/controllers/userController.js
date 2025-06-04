const users= require('../models/userModel');
const bcrypt = require('bcrypt');
const validatePassword= require('../utils/validatePassword');
const validateEmail= require('../utils/validateEmail');
const generateTokenAndSetCookies = (require('../utils/generateTokenAndSetCookies'));

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const usersList = await users.getAllUsers();
            res.status(200).json({ message: 'Users fetched successfully', users: usersList.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role })) }); 
    } catch (error) { 
        res.status(500).json({ message: 'Error fetching users' });
    }
};
const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
      }
  
      const existingUser = await users.getAllUsers();
      if (existingUser.some(user => user.email === email || user.name === name)) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
      }
  
      if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one number and one special character' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const userData = { name, email, password: hashedPassword };
      const userId = await users.createUser(userData);
  
      generateTokenAndSetCookies(res, { id: userId, name, email });
  
      res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  };
// Login user, check if login as admin or user
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const allUsers = await users.getAllUsers(); // assuming users is your DB access
      const foundUser = allUsers.find(u => u.email === email);
  
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (foundUser.role === 'admin') {
        generateTokenAndSetCookies(res, foundUser);
        return res.status(200).json({ message: 'Login successful', user: foundUser });
      }
  
      const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    
  
      generateTokenAndSetCookies(res, foundUser);
      return res.status(200).json({ message: 'Login successful', user: foundUser.name, role: foundUser.role });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in user' });
    }
  };

//logout a user
const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};


module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    logoutUser
}
