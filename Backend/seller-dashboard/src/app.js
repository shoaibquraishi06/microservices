const express = require('express');
const cookieParser = require('cookie-parser');
const sellerRoutes = require('./routes/seller.routes')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nike-4.netlify.app"
  ],
  credentials: true
}));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Seller Dashboard Service is running.' });
});

app.use("/api/seller/dashboard", sellerRoutes);

module.exports = app;
