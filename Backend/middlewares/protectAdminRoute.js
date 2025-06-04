const jwt= require("jsonwebtoken");
const dotenv= require('dotenv');
dotenv.config()

const protectAdminRoute= async(req,res,next)=>{
    const token= req.cookies?.token;
    if(!token){
        return res.status(401).json({ message: 'Not authorized. No token provided.' });  
      }
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        if(decoded.role!=="admin"){
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        next();
    } catch (error) {
        console.error("Admin route protection error:", error.message);
        res.status(500).json({ message: 'Invalid or expired token' });    }
};
module.exports= protectAdminRoute;