const express=require('express');
const router=express.Router();
const protectRoute = require('../middlewares/protectRoute');
const{createUser,loginUser,getAllUsers, logoutUser}=require('../controllers/userController');

router.post('/login',loginUser);
router.post('/register',createUser);
router.get('/',protectRoute,getAllUsers);
router.post('/logout', logoutUser);



module.exports=router;