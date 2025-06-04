const express=require('express');
const router=express.Router();
const protectRoute = require('../middlewares/protectRoute');
const protectAdminRoute= require("../middlewares/protectAdminRoute");
const { getAllProducts, getProductByName, getProductsByCategory, createProduct, deleteProduct,updateProduct, deleteAllProducts } = require('../controllers/productController');


router.get('/',protectRoute,getAllProducts);
router.get('/productsName',protectRoute,getProductByName);
router.get('/productCategory',protectRoute,getProductsByCategory);

router.post('/create-product',protectAdminRoute,createProduct)

router.delete('/:id',protectAdminRoute,deleteProduct);
router.delete('/delete-all',protectAdminRoute,deleteAllProducts);

router.put('/update/:id', protectAdminRoute,updateProduct);


module.exports=router; 