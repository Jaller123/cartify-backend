require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); //The database file for MongoDB connection
const cors = require('cors');
const path = require('path');
const auth = require('./middleware/auth')

const app = express();
connectDB(); //Connecting to MongoDB    

const allowedOrigins = ['http://localhost:6006', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    }
}));

//Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

//Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', auth, require('./routes/products'));


//Server Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))