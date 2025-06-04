const express= require('express');
const app= express();
const cookieParser = require('cookie-parser');
const dotenv= require('dotenv');
const cors= require('cors');
const userRoutes = require('./Routes/userRoutes');
const productRoutes= require('./routes/productRoutes')


dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 
app.use('/api/user', userRoutes);
app.use('/api/products',productRoutes);

 


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}); 