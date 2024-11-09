require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); //The database file for MongoDB connection
const cors = require('cors');


const app = express();
connectDB(); //Connecting to MongoDB    

//Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static('/images'))

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/products'));

//Server Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))