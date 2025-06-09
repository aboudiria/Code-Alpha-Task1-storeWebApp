const express= require('express');
const app= express();
const cookieParser = require('cookie-parser');
const dotenv= require('dotenv');
const cors= require('cors');
const userRoutes = require('./Routes/userRoutes');
const productRoutes= require('./routes/productRoutes')
const orderRoutes= require('./routes/orderRoutes');
const orderItemRoutes= require('./routes/orderItemRoutes');
const  cartRoutes= require('./routes/cartRoutes');
const shippingRoutes= require('./routes/shippingRoutes');


dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use('/api/user', userRoutes);
app.use('/api/products',productRoutes);
app.use('api/orders',orderRoutes);
app.use('api/orders-item',orderItemRoutes);
app.use('api/cart',cartRoutes);
app.use('api/shipping',shippingRoutes);


 


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); 