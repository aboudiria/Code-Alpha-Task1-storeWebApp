const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateTokenAndSetCookies = (res, user) => {
  try {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '14h',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 14 * 60 * 60 * 1000, // 14 hours
      sameSite: 'strict',
   
    });
  } catch (error) {
    console.error('Error generating token and setting cookies:', error);
    throw error; // Let the controller handle the response
  }
};

module.exports = generateTokenAndSetCookies;
