const express = require('express');
const cookieParser = require('cookie-parser');
const cartRoutes = require('./routes/cart.routes');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://microservices-1-wmb0.onrender.com",
    credentials: true
}));


app.get('/', (req, res) => {
    res.status(200).json({
        message: "Cart service is running"
    });
})



app.use('/api/cart', cartRoutes);

module.exports = app;